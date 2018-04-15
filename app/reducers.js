import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import medications from './bundles/medications'

export default combineReducers({
  medications,
  form: formReducer,
})
