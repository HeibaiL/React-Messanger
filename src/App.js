import React,{Component} from 'react';
import Chatkit from "@pusher/chatkit-client/";
import './App.css';
import ChatComponent from "./components/ChatComponent.js"
import {instanceLocator,tokenUrl, secretKey} from "./chatConfig";


class App extends Component {
    constructor() {
        super();
        this.state={
            messages:[],
            rooms:[],
            chatManager: new Chatkit.ChatManager(
                {
                    instanceLocator,
                    tokenProvider: new Chatkit.TokenProvider(
                        {
                            url: tokenUrl
                        }),
                    userId: "Don"
                })
        };
    };

    componentDidMount(){
        this.showRooms()
        this.state.chatManager.connect().then(currentUser=>{
            this.setState({user:currentUser})
        })
    }
    showRooms=()=>{
        this.state.chatManager.connect().then(currentUser=>{
            this.setState({rooms:[].concat(currentUser.rooms)})
        })
    }


    sendMessage=(message)=>{
        this.state.user.sendSimpleMessage({
            text: message,
            roomId: this.state.roomId
        });
    };

    changeRoom = (e) => {
        let disconnect = new Promise(resolve=>
            resolve(this.state.chatManager.disconnect()
            )
        );
        this.setState({messages:[]})
        let name = e.target.innerHTML;
        //ASK ABOUT PROMISES HERE
        //TODO
        disconnect.then(this.state.chatManager.connect().then(currentUser => {
            let room = currentUser.rooms.filter(room=>room.name==name)[0];
            console.log(room.id)
            currentUser.subscribeToRoom({
                roomId:room.id,
                hooks:{
                    onMessage: message=>{
                        this.setState(prevState=>{
                            return {
                                messages:[...prevState.messages, message],
                                user: currentUser,
                                roomId:room.id
                            }
                        })
                    }
                }
            })
        }
    ))
    };

    makeRoom=(name)=> {
        if(name!=="") {
            this.state.chatManager.connect().then(currentUser => {
                currentUser.createRoom({
                    id: name,
                    name,
                    private: true
                }).then(() => this.showRooms())
                    .then(this.setState({roomId: name}))
                    .then(this.sendMessage("Created New Room"))
            })
        }
    }

    render (){
            return (
                <ChatComponent messages={this.state.messages}
                               user={this.state.user}
                               roomId={this.state.roomId}
                               rooms={this.state.rooms}
                               changeRoom={this.changeRoom}
                                sendMessage={this.sendMessage}
                                makeRoom={this.makeRoom}/>
            )
        }
    }

export default App;