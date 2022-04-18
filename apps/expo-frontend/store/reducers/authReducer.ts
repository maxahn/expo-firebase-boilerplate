import { User } from 'firebase/auth';

import { LOGIN, LOGOUT } from '../actions';

export interface AuthState {
    isLoggedIn: boolean;
    isInitialized: boolean;
    authUser: User | null;
}

export const initAuthState: AuthState = {
    isLoggedIn: false,
    isInitialized: false,
    authUser: null,
};

interface AuthReducerActionProps {
    type: string;
    payload?: AuthState;
}

export const authReducer = (
    state = initAuthState,
    action: AuthReducerActionProps,
): AuthState => {
    switch (action.type) {
        case LOGIN: {
            if (!action.payload)
                throw new Error('Missing payload from Login Auth Reducer.');
            const { authUser } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                authUser,
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                isInitialized: true,
                authUser: null,
            };
        }
        default: {
            return { ...state };
        }
    }
};
