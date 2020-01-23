import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";

import './index.css';
import App from './App';
import {rootReducer} from "./store/reducers";

export const store = createStore(rootReducer);

const saveState = (state) => {
    const serializedState = JSON.stringify(state);
   localStorage.setItem('state', serializedState);
};
store.subscribe(() => {
   // saveState(store.getState())
})


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
