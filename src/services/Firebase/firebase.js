import firebase from 'firebase';
import app from 'firebase/app';
import 'firebase/auth';
import Constants from 'expo-constants';
import * as GoogleSignIn from 'expo-google-sign-in';

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
    this.initGoogleAuthAsync();
  }

  initGoogleAuthAsync = async () => {
    await GoogleSignIn.initAsync();
  };

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => {
    const { currentUser } = this.auth;
    return currentUser ? currentUser.updatePassword(password) : null;
  };

  signInWithGoogle = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        // TODO: on success
        this.user = user;
      }
    } catch ({ message }) {
      // eslint-disable-next-line no-console
      console.log(`Login Error: ${message}`);
    }
  };

  signOutWithGoogle = async () => {
    await GoogleSignIn.signOutAsync();
  };
}

export default Firebase;
