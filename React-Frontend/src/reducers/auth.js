import {
    LOGIN_REQUEST,
    LOGIN_SUCCEED,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCEED,
    LOGOUT_FAIL
} from "../actions/";

export default (
    state = {
        isLoggingIn: false,
        isLoggingOut: false,
        loginError: false,
        logoutError: false,
        isAuthenticated: false,
    },
    action
) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: false
            };
        case LOGIN_SUCCEED:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: true
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                logoutError: false
            };
        case LOGOUT_SUCCEED:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                isLoggingOut: false,
                logoutError: true
            };
        default:
            return state;
    }
};