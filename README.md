# Expo Firebase Template

## Setup

### Create .env file

Create an .env file inside the `apps/expo-frontend` folder. Then copy and paste the following

```
# Firebase Credentials
API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
AUTH_DOMAIN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.firebaseapp.com
PROJECT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
STORAGE_BUCKET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.appspot.com
MESSAGING_SENDER_ID=XXXXXXXXXXXX
APP_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Google Oauth
GOOGLE_OAUTH_WEB_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com
```

#### Firebase Credentials

You'll want to replace the placeholder values for the Firebase Credentials. You can get this by going to the [firebase console](console.firebase.google.com) and creating a project if you haven't already done so. Then go to Project Settings, scroll down and and add a Web App. It should display a code snippet with your credentials here.

#### Google Oauth

Get your Web client ID by going to the [firebase console](https://console.firebase.google.com) and following these steps from the [Expo documentation](https://docs.expo.dev/guides/authentication/#google):

1. Enable Google auth
   - Open "Web SDK configuration"
   - Save "Web client ID" you'll need it later
   - Press Save
2. Replace `YOUR_GUID` with your "Web client ID" and open this link:
   - [https://console.developers.google.com/apis/credentials/oauthclient/YOUR_GUID](https://console.developers.google.com/apis/credentials/oauthclient/YOUR_GUID)
3. Under "URIs" add your hosts URLs
   - Web dev: https://localhost:19006
   - Expo Go Proxy: [https://auth.expo.io](https://auth.expo.io)
4. Under "Authorized redirect URIs"
   - Web dev: https://localhost:19006 -- this is assuming you want to invoke `WebBrowser.maybeCompleteAuthSession();` from the root URL of your app.
   - Expo Go Proxy: [https://auth.expo.io/@yourname/your-app](https://auth.expo.io/@yourname/your-app)

### Update References

- `.firebaserc`
  - update `projects.default` to your firebase project app id.

## Development

### Start Expo Server

`cd apps/expo-frontend && expo start`

### Start emulator

The ports for the emulators are specified in the `firebase.json` at the root of the project. These ports are hard coded in the c

### Functions Compile On Save

#### VS Code

_Ctrl + Shift + B_ to open a list of tasks in VS Code and select `tsc: watch - functions/tsconfig.json`.

This will compile code on save in the functions folder.
