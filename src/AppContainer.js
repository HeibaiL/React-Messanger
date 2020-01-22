import React,{Component} from "react";
import {connect} from "react-redux";

import App from "./App";
import {setCurrentUser} from "./store/App/actions";

class AppContainer extends Component{
    render(){
        return <App setCurrentUser={this.props.setCurrentUser} currentUser = {this.props.currentUser}/>
    }
}
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}
const serializedState = loadState();

const mapStateToProps = state => {
    if(!serializedState){
        return {
            currentUser: state.app.currentUser
        }
    }else{
        return {
            currentUser: serializedState.app.currentUser
        }
    }
}
const mapDispatchToProps = {
    setCurrentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);