import http from '../api/http';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCEED = "LOGIN_SUCCEED";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCEED = "LOGOUT_SUCCEED";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCEED = "REGISTER_SUCCEED";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCEED = "VERIFY_SUCCEED";

/* #region Login States */
const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
}

const successfulLogin = () => {
    return {
        type: LOGIN_SUCCEED
    };
};

export const loginError = () => {
    return {
        type: LOGIN_FAIL
    };
};
/* #endregion */

/* #region Logout States */
const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const successfulLogout = user => {
    return {
        type: LOGOUT_SUCCEED,
        user
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAIL
    };
};
/* #endregion */

/* #region Registration States */
const requestRegister = user => {
    return {
        type: REGISTER_REQUEST,
        user
    };
}

const successfulRegister = user => {
    return {
        type: REGISTER_SUCCEED,
        user
    }
}

const registerError = () => {
    return {
        type: REGISTER_FAIL
    }
}
/* #endregion */

export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin());

    const body = JSON.stringify({
        "email": email,
        "password": password
    });

    http.loginUser(body)
    .then(async (response) => {
        const body = await response.json();
        if (response.status === 200) {
            sessionStorage.setItem('token', body["token"])
            sessionStorage.setItem("isInstructor", (body["userType"][0]["role"]) === "INSTRUCTOR" ? true : false)
            dispatch(successfulLogin());
        } else {
            // TODO: show error
            console.log("not logged in");
           dispatch(loginError());
        }    
    }).catch((e) => {
        // error in e.message
        dispatch(loginError());
        console.log("error:"+e.message)
    });
    // dispatch(successfulLogin());
}

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());

    var loggedOut = false
    sessionStorage.clear()
    if(sessionStorage.getItem("token") === null){
        loggedOut = true
    }

    // if user is logged out
    if (loggedOut) {
        // TODO: update view
        console.log("logged out");
        dispatch(successfulLogout());
    } else {
        console.log("not logged out");
        dispatch(logoutError());
    }
}

export const registerUser = (firstName, lastName, birthDate, email, password, instructorCheckmarkBox) => dispatch => {
    dispatch(requestRegister())

    const body = JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "birthDate": birthDate,
        "email": email,
        "password": password,
        "roles": [{"role": instructorCheckmarkBox ? "INSTRUCTOR":"STUDENT"}]
    })

    http.createNewUser(body)
    .then( async(response) => {
        var body = await response.json();
        if(body.status === 200 && body.data["message"] === "User registered successfully"){
            dispatch(successfulRegister());            
        } else {
            // TODO: show error
            console.log("user not registered");
            dispatch(registerError());
        }
    }).catch((e) => {
        // error in e.message
        dispatch(registerError());
        console.log("error:"+e.message)
        
    });
}