import Constants from 'expo-constants';

export const DevPrivateIP = Constants.manifest?.extra?.devPrivateIP;

export const EnvExtra = Constants.manifest
    ? Constants.manifest.extra
    : Constants.manifest2?.extra?.expoClient?.extra;

function getFirebaseConfig() {
    return {
        apiKey: EnvExtra?.apiKey,
        authDomain: EnvExtra?.authDomain,
        projectId: EnvExtra?.projectId,
        messagingSenderId: EnvExtra?.messagingSenderId,
        storageBucket: EnvExtra?.storageBucket,
    };
}

export default getFirebaseConfig();
