import {APP_SET_CURRENTUSER} from "./actions";

const defaultState = {
    loading:false,
    isLogged:false,
    currentUser: undefined,
    isIncorrect:false
};

export const appReducer = (state= defaultState, action) => {
    switch(action.type){
        case APP_SET_CURRENTUSER:
        return {
            ...state,
            currentUser:action.payload
        };
    }
        return state;
}