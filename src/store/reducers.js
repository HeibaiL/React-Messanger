import {combineReducers} from "redux";
import {appReducer} from "./App/reducers";

const rootReducer = combineReducers({
     app:appReducer,
    }
);
export {rootReducer};