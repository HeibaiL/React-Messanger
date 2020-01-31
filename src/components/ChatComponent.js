import React from "react";
import {ChatManager, TokenProvider} from '@pusher/chatkit-client';
import {connect} from "react-redux";

import Rooms from "./Rooms.js";
import ChatWindow from "./ChatWindow.js";
import AddRoom from "./AddRoom.js";
import TextInput from "./TextInput.js";
import {tokenUrl, instanceLocator} from "../chatConfig";
import {setLoggedUser,logOut} from "../store/App/actions";

const mapStateToProps = state =>{
    return {
        loggedUser: state.app.loggedUser
    }
}

const mapDispatchToProps = {
    setLoggedUser,
    logOut
}

class ChatComponent extends React.Component {
    state = {
        roomId: undefined
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator,
            userId: this.props.user.id,
            tokenProvider: new TokenProvider({url: tokenUrl})
        });
        chatManager.connect().then(user => {
               this.props.setLoggedUser(user)
               const {loggedUser} = this.props;
                if(loggedUser) {
                    this.setState({roomId:loggedUser.rooms[0].id})
                }
        })
    }


    changeRoom = (id) => {
        this.setState({roomId: id});
    };

    makeRoom = (name) => {
        const {loggedUser} = this.props;
        if (name) {
            loggedUser.createRoom({
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
        localStorage.clear();
    }

    render() {

        const {makeRoom, changeRoom} = this;
        const {handleChange, loggedUser} = this.props;
        const { roomId } = this.state;
        return (
            <div className="chat-component">
                <div className="room-chat">
                    <Rooms
                        changeRoom={changeRoom}
                        roomId={roomId}
                    />
                    <ChatWindow
                        roomId={roomId}
                        user={loggedUser}
                    />
                </div>
                <div className="footer">
                    <AddRoom makeRoom={makeRoom} handleChange={handleChange}/>
                    <TextInput handleChange={handleChange} user={loggedUser} roomId={roomId}/>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent)