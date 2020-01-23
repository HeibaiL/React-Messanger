import {APP_SET_CURRENTUSER,APP_LOG_OUT,CONNECTED_USER} from "./actions";


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
        case APP_LOG_OUT:
         return{
                ...state,
             currentUser:action.payload
         };
        case CONNECTED_USER:
            return {
                ...state,
                loggedUser: action.payload
            }
    }
        return state;
}