import React,{Component} from "react";
export default function ChatWindowComponent(props){

     const renderMessage = messages => {
        return messages.map( message => {
            if(message.senderId == props.id) {
                return (
                    <div className="user messages" key={message.id}>
                        <p className="message">{message.text}</p>
                    </div>
                )
            } else {
                return (
                    <div className="partner messages" key={message.id}>
                        <p className="message">{message.text}</p>
                    </div>
                )
              }
            })
        }

        return (
            <div className="chat-window">
                <div className="chat-content">
                    {renderMessage(props.messages)}
                </div>
            </div>
        )
}