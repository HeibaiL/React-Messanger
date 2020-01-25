export const APP_SET_CURRENTUSER = "APP_SET_CURRENTUSER";
export const LOG_OUT = "APP_LOG_OUT";
export const SET_CONNECTED_USER = "SET_CONNECTED_USER"

export const setCurrentUser = (user)=>({
        type: APP_SET_CURRENTUSER,
        payload:user
    }
    );
export const updateConnectedUser = (user)=>({
    type:SET_CONNECTED_USER,
    payload:user
})

export const logOut = ()=>({
    type:LOG_OUT,
    payload:undefined
    }
);