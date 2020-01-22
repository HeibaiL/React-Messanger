import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,combineReducers} from "redux";
import {Provider,connect} from "react-redux";
import {setCurrentUser} from "./store/App/actions"

import './index.css';
import App from './App';
import {rootReducer} from "./store/reducers";

export {combineReducers};

const store = createStore(rootReducer);
const mapStateToProps = state => {
    return {
        currentUser:state.app.currentUser
    }
}
const mapDispatchToProps = {
    setCurrentUser
}
const WrappedComponent = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(<Provider store = {store}><WrappedComponent/></Provider>, document.getElementById('root'));
