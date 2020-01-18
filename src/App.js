import React, {Component} from 'react';
import Chatkit from "@pusher/chatkit-client";
import './App.css';
import ChatComponent from "./components/ChatComponent.js"
import {chatManager} from "./chatConfig";


class App extends Component {
    state = {
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

    changeRoom = (name) => {
        const {
            currentUser: {
                rooms
            }
        } = this.state;
        this.setState({roomId: name});
    };

    makeRoom = (name) => {
        const {currentUser} = this.state;

        if (name) {
            currentUser.createRoom({
                name,
                id: name,
                private: true
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
            currentUser
        } = this.state;
        if(currentUser){
        }

        return (
            <ChatComponent
                deleteRoom={this.deleteRoom}
                roomId={roomId}
                user={currentUser}
                makeRoom={this.makeRoom}
                changeRoom={this.changeRoom}
                sendMessage={this.sendMessage}
            />
        )
    }
}

export default App;