import React,{Component} from 'react';
import Chatkit from "@pusher/chatkit-client/";
import './App.css';
import ChatComponent from "./components/ChatComponent.js"
import {instanceLocator,tokenUrl, secretKey} from "./chatConfig";


class App extends Component {
    componentDidMount(){
        const tokenProvider = new Chatkit.TokenProvider(
            {
                url: tokenUrl
            });
        const chatManager = new Chatkit.ChatManager(
            {
                instanceLocator,
                tokenProvider,
                userId: "bobik"
            });
        chatManager.connect().then(currentUser=>console.log(currentUser))
    }
    render (){
        return(

//     <ChatkitProvider
//   instanceLocator={'<YOUR_INSTANCE_ID>'}
//   tokenProvider={new TokenProvider({ url: '<YOUR_AUTH_URL>' })}
//   userId={'<YOUR_USER_ID>'}
// >
//   <YourChatComponent />
// </ChatkitProvider>
            <ChatComponent/>
        )
    }
}

export default App;