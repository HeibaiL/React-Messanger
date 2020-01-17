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
                    tokenProvider: new Chatkit.TokenProvider(
                        {
                            url: tokenUrl
                        }),
                    userId: "Don"
                })
        };
    }
    changeRoom = (e) => {
        this.setState({messages:[]})
        let name = e.target.innerHTML;
        this.state.chatManager.connect().then(currentUser => {
            let room = currentUser.rooms.filter(room=>room.name==name)[0]
                currentUser.subscribeToRoom({
                    roomId:room.id,
                    hooks:{
                        onMessage: message=>{
                            this.setState(prevState=>{
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
        this.state.chatManager.connect().then(currentUser=>{
            console.log(currentUser.rooms)
        })
        // this.state.chatManager.connect().then(currentUser => {
        //        currentUser.subscribeToRoom({
        //            roomId:currentUser.rooms[0].id,
        //            hooks:{
        //                onMessage: message=>{
        //                    this.setState(prevState=>{
        //                        return {
        //                            messages:[...prevState.messages, message],
        //                            user: currentUser,
        //                            roomId:currentUser.rooms[0].id
        //                        }
        //                    })
        //                }
        //            }
        //        })
        //     }
        // )
    }

    render (){
            return (
                <ChatComponent messages={this.state.messages} user={this.state.user} roomId={this.state.roomId} changeRoom={this.changeRoom}/>
            )
        }
    }

export default App;