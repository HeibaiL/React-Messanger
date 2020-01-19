import React, {Component} from 'react';

import './App.css';
import {LoggingWindow} from "./components/LoggingWindow";
import ChatComponent from "./components/ChatComponent";
import {chatManager} from "./chatConfig";


class App extends Component {
    state = {
        isLogged:false,
        roomId: undefined,
        currentUser: undefined,
    };

    componentDidMount() {
        chatManager.connect().then(currentUser => {
            this.setState({
                currentUser
            })
        })
    }

    // componentWillUnmount() {
    //     chatManager.disconnect()
    // }

    sendMessage = (message) => {
        const {currentUser, roomId} = this.state;

        currentUser.sendSimpleMessage({
            roomId,
            text: message,
        });
    };

    changeRoom = (id) => {
        this.setState({roomId: id});
    };

    makeRoom = (name) => {
        const {currentUser} = this.state;

        if (name) {
            currentUser.createRoom({
                name,
                id: name,
                private: false
            }).then(() => {
                this.setState({roomId: name});
                this.sendMessage("Created New Room");
            });
        }
    };
    deleteRoom=(roomId)=>{
        const {currentUser}=this.state;
        currentUser.leaveRoom({roomId}).then(currentUser=>this.setState(prevState=>({currentUser:prevState.currentUser})))

    }

    render() {
        const {
            roomId,
            currentUser,
            isLogged
        } = this.state;
     if(isLogged){
       return  <ChatComponent
             deleteRoom={this.deleteRoom}
             roomId={roomId}
             user={currentUser}
             makeRoom={this.makeRoom}
             changeRoom={this.changeRoom}
             sendMessage={this.sendMessage}
         />
     }else{
         return <LoggingWindow/>
     }
    }
}

export default App;