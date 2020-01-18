import React, {Component} from 'react';
import Chatkit from "@pusher/chatkit-client";
import './App.css';
import ChatComponent from "./components/ChatComponent.js"
import {instanceLocator, tokenUrl} from "./chatConfig";

const chatManager = new Chatkit.ChatManager({
    instanceLocator,
    tokenProvider: new Chatkit.TokenProvider(
        {
            url: tokenUrl
        }),
    userId: "Don"
});

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

    render() {
        const {
            roomId,
            currentUser
        } = this.state;
        return (
            <ChatComponent
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