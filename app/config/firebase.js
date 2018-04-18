import firebase from 'firebase'

import secrets from './secrets'

const firebaseConfig = {
  apiKey: secrets.firebase.apiKey,
  authDomain: secrets.firebase.authDomain,
  databaseURL: secrets.firebase.databaseURL,
  projectId: secrets.firebase.projectId,
  storageBucket: secrets.firebase.storageBucket,
}

firebase.initializeApp(firebaseConfig)

export default firebase.database()
