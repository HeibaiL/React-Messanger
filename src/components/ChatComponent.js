import React from "react";
import Rooms from "./Rooms.js";
import ChatWindow from "./ChatWindow.js";
import AddRoom from "./AddRoom.js";
import TextInput from "./TextInput.js"

export default function ChatComponent(props){
    let id = props.user?props.user.id:null;
    return (
        <div className="chat-component">
            <div className="room-chat">
                <Rooms user={props.user}/>
                <ChatWindow messages={props.messages} user={props.user} id={id}/>
            </div>
            <div className="footer">
                <AddRoom/>
                <TextInput/>
            </div>

        </div>
    )
}