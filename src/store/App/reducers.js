import {APP_SET_CURRENTUSER,APP_LOG_OUT} from "./actions";


const defaultState = {
    currentUser: undefined,
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
    }
        return state;
}