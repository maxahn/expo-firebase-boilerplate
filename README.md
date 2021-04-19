# Expo Firebase Boilerplate

## Introduction

This is a boilerplate set up (in progress) for Expo and Firebase to get the basic app functionality ready to go so I can hit the ground running whenever I start up a new project. Feel free to use it and give feedback.

## Features

- User Authentication and instantiation in Firebase upon sign up
- Eslint and prettier set up with Husky hooks to check syntax to prevent the committing of bad code.
- Route navigation between 4

## Get Started

### 1. Install package dependencies

This boilerplate uses expo so run `expo install` to install its dependencies.

### 2. Set up Firebase credentials

This project uses an .env file to store credentials. Create an .env file at the root of your project and copy and paste the following into it.

```
REACT_APP_API_KEY=XXXXxxxx
REACT_APP_AUTH_DOMAIN=xxxxXXXX.firebaseapp.com
REACT_APP_DATABASE_URL=https://xxxXXXX.firebaseio.com
REACT_APP_PROJECT_ID=xxxxXXXX
REACT_APP_STORAGE_BUCKET=xxxxXXXX.appspot.com
REACT_APP_MESSAGING_SENDER_ID=xxxxXXXX
```

Then, go create a Firebase project at the [firebase console](https://console.firebase.google.com/), create a Web App and get the credentials and replace the placeholder values.

**NOTE: Just storing your credentials in the .env aren't what will keep your Firebase app secure; they are still accessible in the public/ folder after the app is built. Instead, you'll have to rely on writing good Firestore Security Rules for you database. More on this later.**

### 3. Set up Google Authentication

This project uses email sign up and google authentication. To set up Google Authentication, go to the [firebase console](https://console.firebase.google.com/) and go to the Project Settings. Under general, add an iOS App and Android App.

#### iOS

iOS bundle ID must match whatever bundle identifier you've chosen which you can specify in the app.json file in the root fo the folder (expo.ios.bundleIdentifier). On Step 2, you will have the option to download the GoogleService-Info.plist file which you need to move to the root of the project.

The other steps like Add Firebase SDK or Add initialization code won't matter since this project is under managed workflow.

In the GoogleService-Info.plist file, copy the REVERSED_CLIENT_ID string value and paste it as teh value of expo.ios.config.reservedClientId in app.json.

#### Android

Similarly, the Android package name must match the expo.android.package name in app.json. On step 2, there will be the option to download config file, google-services.json, which should be moved to the root of the project.

The step, Add Firebase SDK, can be ignored.

There are few more steps for Android that you must do.

1. First, run the `expo build:android` if you haven't yet done so for this project.

2. Then, run `fetch:android:hashes` and copy the value returned for Google Certificate Fingerprint.

3. Go back to the Firebase console and Android App settings. There will an option to Add fingerprint. Click it and paste the value before adding.
