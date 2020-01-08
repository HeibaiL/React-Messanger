import React from "react";
import Rooms from "./Rooms.js";
import ChatWindow from "./ChatWindow.js";
import AddRoom from "./AddRoom.js";
import TextInput from "./TextInput.js"

export default function chatComponent(){

    return (
        <div className="chat-component">
            <div className="room-chat">
                <Rooms/>
                <ChatWindow/>
            </div>
            <div className="footer">
                <AddRoom/>
                <TextInput/>
            </div>

        </div>
    )
}