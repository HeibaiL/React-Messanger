import React,{Component} from 'react';
import Chatkit from "@pusher/chatkit-client/";
import './App.css';
import ChatComponent from "./components/ChatComponent.js"
import {instanceLocator,tokenUrl, secretKey} from "./chatConfig";


class App extends Component {
    constructor() {
        super();
        this.state={
            messages:[]
        };
    }
    componentDidMount(){
        const tokenProvider = new Chatkit.TokenProvider(
            {
                url: tokenUrl
            });
        const chatManager = new Chatkit.ChatManager(
            {
                instanceLocator,
                tokenProvider,
                userId: "Don"
            });

        chatManager.connect().then(currentUser => {
               currentUser.subscribeToRoom({
                   roomId:currentUser.rooms[0].id,
                   hooks:{
                       onMessage:message=>{
                           this.setState(prevState=>{
                               return {
                                   messages:[...prevState.messages, message],
                                   user:currentUser
                               }
                           })
                       }
                   }
               })
            }
        )

    }

    render (){
        return(
            <ChatComponent messages={this.state.messages} user={this.state.user}/>
        )
    }
}

export default App;