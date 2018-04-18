import { takeLatest, select } from 'redux-saga/effects'
import uuid from 'uuid-v4'
import { Notifications } from 'expo'
import moment from 'moment'
import flatten from 'lodash/flatten'

import database from '../config/firebase'

const ADD_MEDICATION = 'medications/add'
const UPDATE_MEDICATION = 'medications/update'
const REMOVE_MEDICATION = 'medications/remove'
const SETUP_NOTIFICATIONS = 'medications/setup_notifications'

const initialState = {
  medications: [],
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_MEDICATION:
      return {
        ...state,
        medications: [
          ...state.medications.slice(),
          { id: uuid(), notifications: [], ...action.payload.data },
        ],
      }
    case UPDATE_MEDICATION: {
      const index = state.medications.findIndex(medication => medication.id === action.payload.data.id)
      return {
        ...state,
        medications: [
          ...state.medications.slice(0, index),
          { ...state.medications[index], ...action.payload.data },
          ...state.medications.slice(index + 1),
        ],
      }
    }
    case REMOVE_MEDICATION: {
      const index = state.medications.findIndex(medication => medication.id === action.payload.data.id)
      return {
        ...state,
        medications: [
          ...state.medications.slice(0, index),
          ...state.medications.slice(index + 1),
        ],
      }
    }
    default:
      return state
  }
}

export function addMedication(data) {
  return {
    type: ADD_MEDICATION,
    payload: { data },
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

export function setupNotifications() {
  return {
    type: SETUP_NOTIFICATIONS,
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

export function* setupNotificationsTask() {
  Notifications.cancelAllScheduledNotificationsAsync()

  const { medications } = yield select(getMedications)

  database.ref('medications/').set(medications)

  const localNotifications = flatten(medications.map(medication => (
    medication.notifications.map(notification => generateNotification(notification, medication))
  )))

  localNotifications.forEach(notification => (
    Notifications.scheduleLocalNotificationAsync(notification.object, notification.schedulingOptions)
  ))
}

export function* medicationsSaga() {
  yield takeLatest(SETUP_NOTIFICATIONS, setupNotificationsTask)
}
