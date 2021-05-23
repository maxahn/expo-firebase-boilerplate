const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
admin.initializeApp(functions.config().firebase);

exports.createNewUserWithUsername = functions.https.onCall(async (data, context) => {
  const { username, email, password } = data;
  // TODO: check uniqueness of username
  const userRecord = await admin
    .auth()
    .createUser({
      email,
      emailVerified: false,
      password,
      displayName: username,
    })
    .catch((err) => {
      console.log({ err });
      const { code, message } = err.errorInfo;
      switch (code) {
        case 'auth/email-already-exists':
          throw new functions.https.HttpsError('already-exists', message);
        default:
          throw new functions.https.HttpsError('internal', message);
      }
    });
  const customToken = await admin
    .auth()
    .createCustomToken(userRecord.uid)
    .catch((err) => {
      console.log({ err });
      throw new functions.https.HttpsError('internal', err);
    });
  return customToken;
});

/* TODO:
  - make this private
  - create onDelete
*/
exports.createFirestoreUser = functions.auth.user().onCreate(async (user) => {
  const { uid, displayName } = user;
  await admin
    .firestore()
    .collection('users')
    .add({
      authUID: uid,
      displayName,
      created: admin.firestore.FieldValue.serverTimestamp(),
    })
    .catch((err) => {
      console.log({ err });
      throw new functions.https.HttpsError('internal:', err);
    });
});

exports.getTasks = functions.https.onCall(async (data, context) => {
  const { uid } = context.auth;
  if (!uid)
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Request does not have user permissions',
    );
  const userSnapshot = await admin
    .firestore()
    .collection('users')
    .where('authUID', '==', uid)
    .get();
  const userData = userSnapshot.docs[0];
  if (!userData)
    throw new functions.https.HttpsError('internal', 'Failed to find authenticated user record.');
  const tasksQuerySnapshot = await admin
    .firestore()
    .collection('users')
    .doc(userData.id)
    .collection('tasks').get();
  const tasks = [];
  tasksQuerySnapshot.forEach((doc) => {
    tasks.push(doc.data());
  });
  return tasks;
});

// TODO: move this to another file
exports.seedUserData = functions.https.onRequest((req, res) => {
  admin
    .auth()
    .createUser({
      email: 'max@max.com',
      emailVerified: false,
      password: 'omgwtfbbq',
      displayName: 'max',
    })
    .then((userRecord) => {
      console.log({ userRecord });
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log({ err });
      res.send(err);
    });
});

exports.seedTasks = functions.https.onRequest((req, res) => {
  const usersRef = admin.firestore().collection('users');
  usersRef
    .where('displayName', '==', 'max')
    .get()
    .then((querySnapShot) => {
      const doc = querySnapShot.docs[0];
      const tasksRef = admin.firestore().collection('users').doc(doc.id).collection('tasks');
      const promises = [];
      console.log({uid: doc.id});
      promises.push(tasksRef.add({
        title: 'Create day manager app',
        description: 'Maybe I will finally get stuff done with this',
        estimatedMinutesToCompleted: 400,
        isCompleted: false,
      }));
      promises.push(tasksRef.add({
        title: 'Take out trash',
        estimatedMinutesToCompleted: 15,
        isCompleted: true,
        dateTimeCompleted: new Date().getTime(),
      }));
      promises.push(tasksRef.add({
        title: 'Clean room',
        estimatedMinutesToCompleted: 30,
        isCompleted: false,
      }));
      return Promise.all(promises);
    })
    .then((result) => {
      console.log('success!!!');
      res.send(result);
    })
    .catch((err) => {
      console.log({ err });
      res.send(err);
    });
});
