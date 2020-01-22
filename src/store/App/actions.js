export const APP_SET_CURRENTUSER = "APP_SET_CURRENTUSER";

export const setCurrentUser = (user)=>({
        type: APP_SET_CURRENTUSER,
        payload:user
    }
    );