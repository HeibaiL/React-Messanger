export const APP_SET_CURRENTUSER = "APP_SET_CURRENTUSER";
export const APP_LOG_OUT = "APP_LOG_OUT";

export const setCurrentUser = (user)=>({
        type: APP_SET_CURRENTUSER,
        payload:user
    }
    );
export const logOut = ()=>({
    type:APP_LOG_OUT,
    payload:undefined
    }
);