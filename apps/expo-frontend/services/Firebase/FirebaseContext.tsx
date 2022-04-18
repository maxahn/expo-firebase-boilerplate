import React, { createContext, useMemo, useEffect, useReducer } from 'react';

import { initializeApp } from 'firebase/app';
import {
    User as AuthUser,
    UserCredential,
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
// import {
//   Firestore,
//   initializeFirestore,
//   getFirestore,
// } from "firebase/firestore";
import config from './config';
import {
    AuthState,
    authReducer,
    initAuthState,
} from '../../store/reducers/authReducer';
import { LOGIN, LOGOUT } from '../../store/actions';

interface FirebaseContextType extends AuthState {
    signUpEmailPassword: (
        email: string,
        password: string,
    ) => Promise<UserCredential>;
    signInEmailPassword: (
        email: string,
        password: string,
    ) => Promise<UserCredential>;
    signOut: () => Promise<void>;
}
const app = initializeApp(config);
// const firestore: Firestore = __DEV__
//   ? initializeFirestore(app, { experimentalForceLongPolling: true })
//   : getFirestore(app);
const auth = getAuth(app);

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export function FirebaseProvider({
    children,
}: {
    children: React.ReactElement;
}) {
    const [authState, dispatchAuth] = useReducer(authReducer, initAuthState);
    const signUpEmailPassword = async (email: string, password: string) =>
        createUserWithEmailAndPassword(auth, email, password);

    const signInEmailPassword = async (email: string, password: string) =>
        signInWithEmailAndPassword(auth, email, password);

    const signOutUser = async () => signOut(auth);

    useEffect(() =>
        onAuthStateChanged(auth, (authUser: AuthUser | null) => {
            if (!authUser) {
                dispatchAuth({ type: LOGOUT });
                return;
            }
            dispatchAuth({
                type: LOGIN,
                payload: { isLoggedIn: true, isInitialized: true, authUser },
            });
        }),
    );

    const value: FirebaseContextType = useMemo(
        () => ({
            ...authState,
            signInEmailPassword,
            signUpEmailPassword,
            signOut: signOutUser,
        }),
        [authState],
    );

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    );
}

export default FirebaseContext;
