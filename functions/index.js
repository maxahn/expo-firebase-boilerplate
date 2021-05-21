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
  const userRecord = await admin.auth().createUser({
      email,
      emailVerified: false,
      password,
      displayName: username,
    }).catch((err) => {
      console.log({ err });
      const { code, message } = err.errorInfo;
      switch (code) {
        case 'auth/email-already-exists':
          throw new functions.https.HttpsError('already-exists', message);
        default:
          throw new functions.https.HttpsError('internal', message);
      }
    });
  const customToken = await admin.auth().createCustomToken(userRecord.uid)
    .catch((err) => {
      console.log({ err });
      throw new functions.https.HttpsError('internal', err);
    });
  return customToken;
});

// TODO: make this private
exports.createFirestoreUser = functions.auth.user().onCreate(async (user) => {
  const { uid } = user;
  
  await admin.firestore().collection('users').add({
    uid, 
    created: admin.firestore.FieldValue.serverTimestamp(),
  }).catch((err) => {
    console.log({ err });
    throw new functions.https.HttpsError('Firestore Error:', err);
  });
});