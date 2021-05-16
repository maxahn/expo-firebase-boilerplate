const functions = require("firebase-functions");
const admin = require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
admin.initializeApp(functions.config().firebase);

exports.createNewUserWithUsername = functions.https.onCall((data, context) => {
  const {username, email, password} = data;
  // TODO: check uniqueness of username
  return admin.auth().createUser({
    email,
    emailVerified: false,
    password,
    displayName: username,
  }).catch((err) => {
    console.log({err});
    throw new functions.https.HttpsError(
        "Auth Error:",
        err
    );
  }).then((userRecord) => {
    return admin.auth().createCustomToken(userRecord.uid);
  }).then((customToken) => {
    return customToken;
  }).catch((err) => {
    console.log({err});
    throw new functions.https.HttpsError(
        "Custom token Error:",
        err
    );
  });
});

