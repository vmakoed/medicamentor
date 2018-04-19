import { takeLatest, select, call, put } from 'redux-saga/effects'
import uuid from 'uuid-v4'
import { Notifications } from 'expo'
import moment from 'moment'
import flatten from 'lodash/flatten'

import database from '../config/firebase'

const LOAD_MEDICATIONS = 'medications/load'
const LOAD_MEDICATIONS_SUCCESS = 'medications/load/success'
const ADD_MEDICATION = 'medications/add'
const UPDATE_MEDICATION = 'medications/update'
const REMOVE_MEDICATION = 'medications/remove'
const SET_MEDICATIONS_SUCCESS = 'medications/submit/success'
const SETUP_NOTIFICATIONS = 'medications/setup_notifications'

const initialState = {
  medications: [],
  loaded: false,
}

const decorateMedication = item => ({ notifications: [], ...item })

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_MEDICATIONS_SUCCESS:
      return {
        ...state,
        medications: action.payload.data.map(decorateMedication),
        loaded: true,
      }
    default:
      return state
  }
}

export function loadMedications() {
  return {
    type: LOAD_MEDICATIONS,
  }
}

export function loadMedicationsSuccess(data) {
  return {
    type: LOAD_MEDICATIONS_SUCCESS,
    payload: { data },
  }
}

export function addMedication(data) {
  return {
    type: ADD_MEDICATION,
    payload: { data },
  }
}

export function setMedicationsSuccess() {
  return {
    type: SET_MEDICATIONS_SUCCESS,
  }
}

export function updateMedication(data) {
  return {
    type: UPDATE_MEDICATION,
    payload: { data },
  }
}

export function removeMedication(data) {
  return {
    type: REMOVE_MEDICATION,
    payload: { data },
  }
}

const getMedications = state => state.medications

const generateNotification = (notification, medication) => ({
  schedulingOptions: {
    time: moment(notification.time, 'HH:mm').toDate(),
    repeat: 'day',
  },
  object: {
    title: 'Take medication',
    body: `${medication.name}`,
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  },
})

function fetchMedications() {
  return new Promise(resolve => database.ref('medications/').once('value', resolve))
}

function setMedications(medications) {
  return new Promise(resolve => database.ref('medications/').set(medications, resolve))
}

export function* loadMedicationsTask() {
  const snapshot = yield call(fetchMedications)
  yield put(loadMedicationsSuccess(snapshot.val()))
}

export function* addMedicationTask({ payload }) {
  const { medications } = yield select(getMedications)
  const newMedications = [
    ...medications.slice(),
    { id: uuid(), notifications: [], ...payload.data },
  ]

  yield call(setMedications, newMedications)
  yield put(setMedicationsSuccess())
}

export function* removeMedicationTask({ payload }) {
  const { medications } = yield select(getMedications)
  const index = medications.findIndex(medication => medication.id === payload.data.id)
  const newMedications = [
    ...medications.slice(0, index),
    ...medications.slice(index + 1),
  ]

  yield call(setMedications, newMedications)
  yield put(setMedicationsSuccess())
}

export function* updateMedicationTask({ payload }) {
  const { medications } = yield select(getMedications)
  const index = medications.findIndex(medication => medication.id === payload.data.id)
  const newMedications = [
    ...medications.slice(0, index),
    { ...medications[index], ...payload.data },
    ...medications.slice(index + 1),
  ]

  yield call(setMedications, newMedications)
  yield put(setMedicationsSuccess())
}

export function* setupNotificationsTask() {
  Notifications.cancelAllScheduledNotificationsAsync()

  const { medications } = yield select(getMedications)

  const localNotifications = flatten(medications.map(medication => (
    medication.notifications.map(notification => generateNotification(notification, medication))
  )))

  localNotifications.forEach(notification => (
    Notifications.scheduleLocalNotificationAsync(notification.object, notification.schedulingOptions)
  ))
}

export function* medicationsSaga() {
  yield takeLatest(SETUP_NOTIFICATIONS, setupNotificationsTask)
  yield takeLatest(LOAD_MEDICATIONS, loadMedicationsTask)
  yield takeLatest(LOAD_MEDICATIONS_SUCCESS, setupNotificationsTask)
  yield takeLatest(SET_MEDICATIONS_SUCCESS, loadMedicationsTask)
  yield takeLatest(ADD_MEDICATION, addMedicationTask)
  yield takeLatest(REMOVE_MEDICATION, removeMedicationTask)
  yield takeLatest(UPDATE_MEDICATION, updateMedicationTask)
}
