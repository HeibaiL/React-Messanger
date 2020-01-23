import React from "react";
import {ChatManager, TokenProvider} from '@pusher/chatkit-client';
import {connect} from "react-redux"

import Rooms from "./Rooms.js";
import ChatWindow from "./ChatWindow.js";
import AddRoom from "./AddRoom.js";
import TextInput from "./TextInput.js";
import {tokenUrl, instanceLocator} from "../chatConfig";
import {updateConnectedUser} from "../store/App/actions";

const mapStateToProps = state =>{
    return {
        loggedUser: state.app.loggedUser
    }
}


const mapDispatchToProps = {
    updateConnectedUser
}

class ChatComponent extends React.Component {
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
            const {loggedUser} = this.props;
               this.props.updateConnectedUser(user)
                this.setState({roomId:user.rooms[0].id})
    })
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
        this.setState({roomId: id});

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

        const {sendMessage, makeRoom, changeRoom} = this;

        const {handleChange, logOut, loggedUser} = this.props;
        const {user, roomId} = this.state;
        return (
            <div className="chat-component">
                <div className="room-chat">
                    <Rooms
                        logOut={logOut}
                        user={loggedUser}
                        changeRoom={changeRoom}
                    />
                    <ChatWindow
                        user={loggedUser}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent)