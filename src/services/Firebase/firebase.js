import firebase from 'firebase';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import Constants from 'expo-constants';
import FirebaseSettings from '../../../firebase.json';

const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  DATABASE_URL,
  DEV_PRIVATE_IP,
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
    if (!firebase.apps.length) app.initializeApp(config);
    this.auth = app.auth();
    this.db = firebase.firestore();
    this.functions = firebase.functions();
    // eslint-disable-next-line no-undef
    if (__DEV__) {
      try {
        const { auth, functions, firestore } = FirebaseSettings.emulators;
        this.db.settings({
          host: `${DEV_PRIVATE_IP}:${firestore.port}`,
          ssl: false,
        });
        this.functions.useEmulator(DEV_PRIVATE_IP, functions.port);
        this.auth.useEmulator(`http://${DEV_PRIVATE_IP}:${auth.port}`);
      } catch (emulatorSetupError) {
        // eslint-disable-next-line no-console
        console.log({ emulatorSetupError });
      }
    }
  }

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doCreateUserWithUsername = (username, email, password) => {
    const createUser = this.functions.httpsCallable('createNewUserWithUsername');
    return createUser({ username, email, password }).then(({ data }) =>
      this.auth.signInWithCustomToken(data),
    );
  };

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => {
    const { currentUser } = this.auth;
    return currentUser ? currentUser.updatePassword(password) : null;
  };

  // task related calls

  doCreateTask = (title, description, estimatedMinutes) => {
    const userId = this.auth.currentUser.uid;
    console.log({ userId });
    this.db.collection('users').doc(userId).collection('tasks').add({
      title,
      description,
      estimatedMinutes,
      isComplete: false,
      workSesssions: [],
    });
  };
}

export default Firebase;
