export const APP_SET_CURRENTUSER = "APP_SET_CURRENTUSER";
export const APP_LOG_OUT = "APP_LOG_OUT";
export const CONNECTED_USER = "CONNECTED_USER"

export const setCurrentUser = (user)=>({
        type: APP_SET_CURRENTUSER,
        payload:user
    }
    );
export const updateConnectedUser = (user)=>({
    type:CONNECTED_USER,
    payload:user
})

export const logOut = ()=>({
    type:APP_LOG_OUT,
    payload:undefined
    }
);