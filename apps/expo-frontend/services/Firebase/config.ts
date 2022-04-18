import Constants from 'expo-constants';

export const DevPrivateIP = Constants.manifest?.extra?.devPrivateIP;

function getConfig() {
    const extra = Constants.manifest
        ? Constants.manifest.extra
        : Constants.manifest2?.extra?.expoClient?.extra;
    return {
        apiKey: extra?.apiKey,
        authDomain: extra?.authDomain,
        projectId: extra?.projectId,
        messagingSenderId: extra?.messagingSenderId,
        storageBucket: extra?.storageBucket,
    };
}

export default getConfig();
