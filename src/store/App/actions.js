export const APP_SET_CURRENTUSER = "APP_SET_CURRENTUSER";
export const APP_SET_LOADING = "APP_SET_LOADING";
export const APP_SET_ISLOGGED = "APP_SET_ISLOGGED";
export const APP_SET_ISINCORRECT = "APP_SET_ISINCORRECT";

export const setCurrentUser = (user)=>({
        type: APP_SET_CURRENTUSER,
        payload:user
    }
    );
// export const setLoading = ()=>({
//         type: "APP_SET_LOADING",
//         payload:user
//     }
// )
// export const setCurrentUser = ()=>({
//         type: "APP_SET_CURRENTUSER",
//         payload:user
//     }
// )
// export const setCurrentUser = ()=>({
//         type: "APP_SET_CURRENTUSER",
//         payload:user
//     }
// )