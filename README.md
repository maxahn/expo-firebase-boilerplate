# Expo Firebase Boilerplate

## Introduction

This is a boilerplate set up (in progress) for Expo and Firebase to get the basic app functionality ready to go so I can hit the ground running whenever I start up a new project. Feel free to use it and give feedback.

## Features

- User Authentication and instantiation in Firebase upon sign up
- Eslint and prettier set up with Husky hooks to check syntax to prevent the committing of bad code.
- Route navigation between 4

## Get Started on Developing

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

Then, go create a Firebase project at the [firebase console](https://console.firebase.google.com/), create a Web App and get fill out these credential values.

**NOTE: Just storing your credentials in the .env aren't what will keep your Firebase app secure; they are still accessible in the public/ folder after the app is built. Instead, you'll have to rely on writing good Firestore Security Rules for you database. More on this later.**

If you want to add other environment variables, make sure to add them import them through the app.config.js file after adding them to the .env file.

Remember to enable the firebase services you wish to use.
e.g. Navigate to Sign-in method under Authentication and enable Email/Password.

### 3. Set up Firebase Emulator Suite

This boilerplate will automatically look for and use the firebase emulator if in development mode. To set up the emulator, please follow the firebase documentation [here](https://firebase.google.com/docs/emulator-suite/connect_and_prototype).

Next, find your private IP address. Add the following line to the .env file, replacing the value with your private ip address.

`REACT_NATIVE_DEV_PRIVATE_IP=<insert private ip address here>`

Configuration should be all set up so you can get the firebase emulator going by running using `firebase emulators:start`.

After setting up the emulator suite and starting the server with `expo start`, be sure to set the connection mode to **LAN**. Otherwise, mobile emulator and physical devices will not be able to connect to the to the Firebase Emulator.

### 4. Configuration Files

Refer to [here](https://support.google.com/firebase/answer/7015592?hl=en).
You will need to get the `google-services.json` and `GoogleService-Info.plist` file and put it at the root of the folder.
You will also need to add the following values to the .env.

```
REACT_NATIVE_APP_ID=<insert value here>
REACT_NATIVE_MEASUREMENT_ID=<insert value here>
```
