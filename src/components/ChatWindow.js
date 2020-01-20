import React from "react";

class ChatWindowComponent extends React.Component{
    state = {
        messages: []
    };
    showMessages=()=>{
    const {roomId,user} = this.props;
        if(roomId){
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
    componentDidMount() {
       this.showMessages()
    }

    componentWillUpdate(props) {
       const { roomId, user } = props;
       if(roomId !== this.props.roomId) {
           let isAvailable;
           user.getJoinableRooms()
               .then(rooms=>isAvailable=rooms.some(room=>room.id==roomId))
               .then(isAvailable=> {
               if (!isAvailable) {
                   this.setState({messages:[]});
                   this.showMessages()
               }else alert("Room is unavailable for now, sorry")
               }
           )}
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