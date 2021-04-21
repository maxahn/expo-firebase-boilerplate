import firebase from 'firebase';
import app from 'firebase/app';
import 'firebase/auth';
import Constants from 'expo-constants';

const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  DATABASE_URL,
} = Constants.manifest.extra;

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      app.initializeApp(config);
    }
    this.auth = app.auth();
    this.db = firebase.firestore();
  }

  doCreateUserWithEmailAndPassword = (username, email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      const { user } = userCredential;
      return this.db.collection('users').add({ username, email: user.email });
    });

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => {
    const { currentUser } = this.auth;
    return currentUser ? currentUser.updatePassword(password) : null;
  };
}

export default Firebase;
