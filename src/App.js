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
            chatManager: new Chatkit.ChatManager(
                {
                    instanceLocator,
                    tokenProvider:new Chatkit.TokenProvider(
                        {
                            url: tokenUrl
                        }),
                    userId: "Don"
                })
        };
    }
    changeRoom(name){
        this.state.chatManager.connect().then(currentUser => {
                currentUser.subscribeToRoom({
                    roomId:currentUser.rooms[0].id,
                    hooks:{
                        onMessage: message=>{
                            this.setState(prevState=>{
                                console.log(currentUser.rooms)
                                return {
                                    messages:[...prevState.messages, message],
                                    user: currentUser
                                }
                            })
                        }
                    }
                })
            }
        )
    }
    componentDidMount(){
        this.state.chatManager.connect().then(currentUser => {
               currentUser.subscribeToRoom({
                   roomId:currentUser.rooms[0].id,
                   hooks:{
                       onMessage: message=>{
                           this.setState(prevState=>{
                               return {
                                   messages:[...prevState.messages, message],
                                   user: currentUser,
                                   roomId:currentUser.rooms[0].id
                               }
                           })
                       }
                   }
               })
            }
        )
    }

    render (){
        console.log(this.state)
            return (
                <ChatComponent messages={this.state.messages} user={this.state.user} roomId={this.state.roomId}/>
            )
        }
    }

export default App;