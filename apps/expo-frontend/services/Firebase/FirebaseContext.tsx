import React, { createContext, useMemo, useEffect, useReducer } from 'react';

import * as WebBrowser from 'expo-web-browser';
import { AuthSessionResult, AuthRequestPromptOptions } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';

import { initializeApp } from 'firebase/app';
import {
    User as AuthUser,
    UserCredential,
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithCredential,
} from 'firebase/auth';
import {
    Firestore,
    initializeFirestore,
    getFirestore,
} from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import config, { EnvExtra } from './config';
import {
    AuthState,
    authReducer,
    initAuthState,
} from '../../store/reducers/authReducer';
import { LOGIN, LOGOUT } from '../../store/actions';
import connectToEmulators from './connectToEmulators';

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
    signInGoogle: (
        options?: AuthRequestPromptOptions | undefined,
    ) => Promise<AuthSessionResult>;
    isGoogleOauthAvailable: boolean;
}
const app = initializeApp(config);

const auth = getAuth(app);
const firestore: Firestore = __DEV__
    ? initializeFirestore(app, { experimentalForceLongPolling: true })
    : getFirestore(app);
const functions = getFunctions(app);

if (__DEV__) {
    connectToEmulators({
        auth,
        firestore,
        functions,
    });
}

WebBrowser.maybeCompleteAuthSession();

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export function FirebaseProvider({
    children,
}: {
    children: React.ReactElement;
}) {
    const [authState, dispatchAuth] = useReducer(authReducer, initAuthState);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        expoClientId: EnvExtra?.webClientId,
        // clientId: EnvExtra?.webClientId,
    });
    const signUpEmailPassword = async (email: string, password: string) =>
        createUserWithEmailAndPassword(auth, email, password);

    const signInEmailPassword = async (email: string, password: string) =>
        signInWithEmailAndPassword(auth, email, password);

    const signOutUser = async () => signOut(auth);

    useEffect(() => {
        if (response?.type === 'success') {
            // eslint-disable-next-line camelcase
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
        }
        const unsubscribeAuthState = onAuthStateChanged(
            auth,
            (authUser: AuthUser | null) => {
                if (!authUser) {
                    dispatchAuth({ type: LOGOUT });
                    return;
                }
                dispatchAuth({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        isInitialized: true,
                        authUser,
                    },
                });
            },
        );

        return unsubscribeAuthState;
    }, [response]);

    const value: FirebaseContextType = useMemo(
        () => ({
            ...authState,
            signInEmailPassword,
            signUpEmailPassword,
            signOut: signOutUser,
            signInGoogle: promptAsync,
            isGoogleOauthAvailable: Boolean(request),
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
