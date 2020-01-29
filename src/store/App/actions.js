export const APP_SET_CURRENTUSER = "APP_SET_CURRENTUSER";
export const LOG_OUT = "APP_LOG_OUT";
export const SET_LOGGED_USER = "SET_LOGGED_USER"

export const setCurrentUser = (user)=>({
        type: APP_SET_CURRENTUSER,
        payload:user
    }
    );
export const setLoggedUser = (user) => ({
    type:SET_LOGGED_USER,
    payload:user
})

export const logOut = () => ({
    type:LOG_OUT,
    payload:undefined
    }
);