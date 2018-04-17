import { medicationsSaga } from '../bundles/medications'

export default function* rootSaga() {
  yield* medicationsSaga()
}
