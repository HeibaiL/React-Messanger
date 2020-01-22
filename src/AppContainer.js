import React,{Component} from "react";
import {connect} from "react-redux";

import App from "./App";
import {setCurrentUser,logOut} from "./store/App/actions";

class AppContainer extends Component{
    loadState = () => {
        try {
            const serializedState = localStorage.getItem('state');
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    };

    render(){
        const serializedState = this.loadState();
        return <App
            setCurrentUser={this.props.setCurrentUser}
            currentUser = {this.props.currentUser}
            logOut={this.props.logOut}
        />
    }
}



const mapStateToProps = state => {
        return {
            currentUser: state.app.currentUser
        }
    };

const mapDispatchToProps = {
    setCurrentUser,
    logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);