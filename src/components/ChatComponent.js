import React from "react";

import Rooms from "./Rooms.js";
import ChatWindow from "./ChatWindow.js";
import AddRoom from "./AddRoom.js";
import TextInput from "./TextInput.js"

export default class ChatComponent extends React.Component {

    render() {
        const {
            roomId,
            makeRoom,
            changeRoom,
            sendMessage,
            user,
            deleteRoom,
            handleChange
        } = this.props;
        return (
            <div className="chat-component">
                <div className="room-chat">
                    <Rooms
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