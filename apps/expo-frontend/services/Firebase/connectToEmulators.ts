import { Firestore, connectFirestoreEmulator } from 'firebase/firestore';
import { Auth, connectAuthEmulator } from 'firebase/auth';
import { Functions, connectFunctionsEmulator } from 'firebase/functions';
import { FirebaseStorage, connectStorageEmulator } from 'firebase/storage';

interface EmulatorProps {
    firestore?: Firestore;
    auth?: Auth;
    functions?: Functions;
    storage?: FirebaseStorage;
}

export default function connectToEmulators({
    firestore,
    auth,
    storage,
    functions,
}: EmulatorProps) {
    if (firestore) {
        connectFirestoreEmulator(firestore, 'localhost', 7003);
    }
    if (auth) {
        const authEmulatorURL = `http://localhost:${7002}`;
        connectAuthEmulator(auth, authEmulatorURL);
    }
    if (storage) {
        connectStorageEmulator(storage, 'localhost', 7004);
    }
    if (functions) {
        connectFunctionsEmulator(functions, 'localhost', 7001);
    }
}
