import * as functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();

exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  admin.firestore().collection("users").doc(user.uid).set({
    // TODO: set user data
  });
});
