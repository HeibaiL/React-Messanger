import React from "react";
import Rooms from "./Rooms.js";
import ChatWindow from "./ChatWindow.js";
import AddRoom from "./AddRoom.js";
import TextInput from "./TextInput.js"

export default class ChatComponent extends React.Component {

    sendMessage=(message)=>{
        this.props.user.sendSimpleMessage({
            text: message,
            roomId: this.props.roomId
        });
    }

    render() {
        return (
            <div className="chat-component">
                <div className="room-chat">
                    <Rooms user={this.props.user} changeRoom={this.props.changeRoom}/>
                    <ChatWindow messages={this.props.messages} user={this.props.user} id={this.props.user ? this.props.user.id : null}/>
                </div>
                <div className="footer">
                    <AddRoom/>
                    <TextInput send={this.sendMessage}/>
                </div>

            </div>
            )
        }
    }