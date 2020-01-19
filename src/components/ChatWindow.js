import React from "react";

class ChatWindowComponent extends React.Component{
    state = {
        messages: []
    };

   componentWillUpdate(props) {
       const { roomId, user } = props;
       if(roomId !== this.props.roomId) {
           this.setState({messages:[]})
           user.subscribeToRoom({
               roomId,
               hooks: {
                   onMessage: msg => {
                       this.setState(state => {
                           return({
                           messages: state.messages.concat(msg)
                       })})
                   }
               }
           });
       }
   }


    render() {
       const { user } = this.props;
       const { messages } = this.state;
        return (
            <div className="chat-window">
                <div className="chat-content">
                    {messages.map(({id, text, senderId}) => (
                        <div
                            key={id}
                            className={`${senderId === user.id ? 'user' : 'partner'} messages`}
                        >
                            <p className="message">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default ChatWindowComponent;