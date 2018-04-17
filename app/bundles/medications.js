import uuid from 'uuid-v4'

const ADD_MEDICATION = 'medications/add'
const UPDATE_MEDICATION = 'medications/update'
const REMOVE_MEDICATION = 'medications/remove'

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
          { ...action.payload.data, id: uuid() },
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
