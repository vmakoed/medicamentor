import { createStore, applyMiddleware } from 'redux'
import createSagaMddleware from 'redux-saga'
import logger from 'redux-logger'

import reducer from '../reducers'
import rootSaga from './saga'

const sagaMiddleware = createSagaMddleware()
const middleware = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}

const store = createStore(reducer, applyMiddleware(...middleware))

sagaMiddleware.run(rootSaga)

export default store
