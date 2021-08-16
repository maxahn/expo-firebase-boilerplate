const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { firestore } = require('firebase-admin');

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

const seedInitialTasks = async (uid) => {
  const tasksRef = admin.firestore().collection('users').doc(uid).collection('tasks');
  const promises = [];
  console.log({ uid });
  promises.push(
    tasksRef.add({
      title: 'Create day manager app',
      description: 'Maybe I will finally get stuff done with this',
      estimatedMinutes: 400,
      isComplete: false,
      workSessions: [],
    }),
  );
  promises.push(
    tasksRef.add({
      title: 'Take out trash',
      estimatedMinutes: 15,
      isComplete: true,
      dateTimeComplete: new Date().getTime(),
      workSessions: [],
    }),
  );
  promises.push(
    tasksRef.add({
      title: 'Clean room',
      estimatedMinutes: 30,
      isComplete: false,
      workSessions: [],
    }),
  );
  return Promise.all(promises);
};

exports.createFirestoreUser = functions.auth.user().onCreate(async (user) => {
  const { uid, displayName } = user;
  try {
    await admin
      .firestore()
      .collection('users')
      .doc(uid)
      .set({
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })
      .catch((err) => {
        console.log({ err });
        throw new functions.https.HttpsError('internal:', err);
      });
    await seedInitialTasks(uid);
    console.log('completed creating firestore');
  } catch (err) {
    console.log({ err });
  }
});

exports.onAuthDelete = functions.auth.user().onDelete(async (user) => {
  await admin.firestore().collection('users').doc(user.uid).delete();
});

exports.getTasks = functions.https.onCall(async (data, context) => {
  const { uid } = context.auth;
  if (!uid)
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Request does not have user permissions. Please sign in.',
    );
  // NTS: would it be better to send the uid so we can prevent this extra query to get it?
  // is it good practice for the client to have access to the user's uid?
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
    .collection('tasks')
    .get();
  const tasks = [];
  tasksQuerySnapshot.forEach((doc) => {
    // console.log({doc: doc.data(), id: doc.id})
    tasks.push({ ...doc.data(), uid: doc.id });
  });
  return tasks;
});

exports.updateTask = functions.https.onCall(async (data, context) => {
  const { uid } = context.auth;
  if (!uid)
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Request does not have user permissions. Please sign in.',
    );
  const userSnapshot = await admin
    .firestore()
    .collection('users')
    .where('authUID', '==', uid)
    .get();
  const userData = userSnapshot.docs[0];
  if (!userData)
    throw new functions.https.HttpsError('internal', 'Failed to find authenticated user record.');
  const validKeys = ['title', 'description', 'estimatedMinutesToComplete', 'isCompleted'];
  const keys = Object.keys(data);
  const sanitizedTask = keys.reduce((acc, curr) => {
    if (validKeys.includes(curr)) {
      return {
        ...acc,
        [`${curr}`]: data[curr],
      };
    } else {
      return acc;
    }
  }, {});
  console.log({ sanitizedTask });
  const taskUpdatePromise = await admin
    .firestore()
    .collection('users')
    .doc(userData.id)
    .collection('tasks')
    .doc(data.uid)
    .update(sanitizedTask)
    .catch((err) => {
      console.log('Error updating promise:');
      console.log({ err });
      throw new functions.https.HttpsError('internal', 'Failed to update task.');
    });
  console.log('Success updating task!');
  console.log({ taskUpdatePromise });
  return taskUpdatePromise;
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
      console.log({ uid: doc.id });
      promises.push(
        tasksRef.add({
          title: 'Create day manager app',
          description: 'Maybe I will finally get stuff done with this',
          estimatedMinutesToComplete: 400,
          isCompleted: false,
          workSessions: [],
        }),
      );
      promises.push(
        tasksRef.add({
          title: 'Take out trash',
          estimatedMinutesToComplete: 15,
          isCompleted: true,
          dateTimeComplete: new Date().getTime(),
          workSessions: [],
        }),
      );
      promises.push(
        tasksRef.add({
          title: 'Clean room',
          estimatedMinutesToComplete: 30,
          isComplete: false,
          workSessions: [],
        }),
      );
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
