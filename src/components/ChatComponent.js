import React from "react";
import {ChatManager, TokenProvider} from '@pusher/chatkit-client'

import Rooms from "./Rooms.js";
import ChatWindow from "./ChatWindow.js";
import AddRoom from "./AddRoom.js";
import TextInput from "./TextInput.js";
import {tokenUrl, instanceLocator} from "../chatConfig";

export default class ChatComponent extends React.Component {
    state = {
        user: undefined,
        roomId: undefined
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator,
            userId: this.props.user.id,
            tokenProvider: new TokenProvider({url: tokenUrl})
        })
        chatManager.connect().then(user => {
                this.setState({user})
            }
        )

    }

    //TODO: DELETEROOM FUNC SHOULD CHANGE STATE.ROOMID FOR THE FIRST AVAILABLE ROOM


    sendMessage = (message) => {
        const {user, roomId} = this.state;
        user.sendSimpleMessage({
            roomId,
            text: message,
        });
    };

    changeRoom = (id) => {
        return this.setState({roomId: id});
    };

    makeRoom = (name) => {
        const {user} = this.state;
        if (name) {
            user.createRoom({
                name,
                id: name,
                private: false
            }).then(() => {
                this.setState({roomId: name});
                this.sendMessage("Created New Room");
            });
        }
    };


    componentWillUnmount() {
        localStorage.clear()
    }

    render() {

        const {deleteRoom, sendMessage, makeRoom, changeRoom} = this;
        const {handleChange, logOut} = this.props;
        const {user, roomId} = this.state;
        return (
            <div className="chat-component">
                <div className="room-chat">
                    <Rooms
                        logOut={logOut}
                        deleteRoom={deleteRoom}
                        user={user}
                        changeRoom={changeRoom}
                    />
                    <ChatWindow
                        user={user}
                        roomId={roomId}
                    />
                </div>
                <div className="footer">
                    <AddRoom makeRoom={makeRoom} handleChange={handleChange}/>
                    <TextInput handleChange={handleChange} sendMessage={sendMessage}/>
                </div>
            </div>
        )
    }
}