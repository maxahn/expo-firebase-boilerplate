import * as functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  admin.firestore().collection("users").doc(user.uid).set({
    // TODO: set user data
  });
});
