import {APP_SET_CURRENTUSER} from "./actions";

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
    }
        return state;
}