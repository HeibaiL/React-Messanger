import React, {Component} from 'react';
import {connect} from "react-redux"

import './App.css';
import LoggingWindow from "./components/LoggingWindow";
import ChatComponent from "./components/ChatComponent";

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
};

const mapStateToProps = state => {
    return {
        currentUser: state.app.currentUser,
    }
};

class App extends Component {
    state = {
        loading: false,
        isLogged:false

    };
    componentDidMount() {

    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    loadScreen = () => {
        this.setState({loading: true})
        setTimeout(() => this.setState(
            {
                loading: false,
            }
        ), 1500)
    };

    render() {
        const serializedState = loadState();
        const currentUser = serializedState?serializedState:this.props.currentUser;
        const {loading} = this.state;
        if (loading) {
            return (
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>)
        } else if (currentUser) {
            return <ChatComponent
                handleChange={this.handleChange}
                user={currentUser}
            />
        } else {
            return <LoggingWindow
                logUser={this.logUser}
                loadScreen={this.loadScreen}
                checkLoginPassword={this.checkLoginPassword} handleChange={this.handleChange}/>
        }
    }
}

export default connect(mapStateToProps, null)(App);