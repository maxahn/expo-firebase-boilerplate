import 'dotenv/config';

export default {
  name: 'Expo Firebase Boilerplate',
  version: '1.0.0',
  extra: {
    API_KEY: process.env.REACT_NATIVE_API_KEY,
    AUTH_DOMAIN: process.env.REACT_NATIVE_AUTH_DOMAIN,
    PROJECT_ID: process.env.REACT_NATIVE_PROJECT_ID,
    STORAGE_BUCKET: process.env.REACT_NATIVE_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.REACT_NATIVE_MESSAGING_SENDER_ID,
    APP_ID: process.env.REACT_NATIVE_APP_ID,
    MEASUREMENT_ID: process.env.REACT_NATIVE_MEASUREMENT,
  },
};
