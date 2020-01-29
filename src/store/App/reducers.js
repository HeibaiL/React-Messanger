import {APP_SET_CURRENTUSER,LOG_OUT,SET_LOGGED_USER} from "./actions";


const defaultState = {
    currentUser: undefined,
    loggedUser:undefined
};

export const appReducer = (state= defaultState, action) => {
    switch(action.type){
        case APP_SET_CURRENTUSER:
        return {
            ...state,
            currentUser:action.payload
        };
        case LOG_OUT:
         return{
                ...state,
             currentUser:action.payload,
             loggedUser: action.payload
         };
        case SET_LOGGED_USER:
            return {
                ...state,
                loggedUser: action.payload
            }
    }
        return state;
}