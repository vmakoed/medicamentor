import firebase from 'firebase'

import secrets from './secrets'

const firebaseConfig = {
  apiKey: secrets.apiKey,
  authDomain: secrets.authDomain,
  databaseURL: secrets.databaseURL,
  projectId: secrets.projectId,
  storageBucket: secrets.storageBucket,
}

firebase.initializeApp(firebaseConfig)

export default firebase.database()
