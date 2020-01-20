import React, {Component} from 'react';

import './App.css';
import {users} from "./users"
import {LoggingWindow} from "./components/LoggingWindow";
import ChatComponent from "./components/ChatComponent";
import {chatManager} from "./chatConfig";


class App extends Component {
    state = {
        loading:false,
        isLogged:false,
        roomId: undefined,
        currentUser: undefined,
    };

    componentDidMount() {
        chatManager.connect().then(currentUser => {
            this.setState({
                currentUser
            })
        })
    }
    checkPassword(password){
        if(users.some(user=>user.password==password)){
            this.setState({isLogged:true})
        }else{
            return
        }
    }
    getLoginPassword=(login, password)=>{
       if(users.some(user=>user.login===login)){
          this.checkPassword(password)
       }else{

       }
    }

    loadScreen=()=>{
        this.setState({loading:true})
        if(this.state.currentUser) {
            setTimeout(() => this.setState(
                {
                    loading: false,
                    roomId: this.state.currentUser.rooms[0].id
                }
            ), 1000)
        }
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    sendMessage = (message) => {
        const {currentUser, roomId} = this.state;
        currentUser.sendSimpleMessage({
            roomId,
            text: message,
        });
    };

    changeRoom = (id) => {
        this.setState({roomId: id});
    };

    makeRoom = (name) => {
        const {currentUser} = this.state;
        if (name) {
            currentUser.createRoom({
                name,
                id: name,
                private: false
            }).then(() => {
                this.setState({roomId: name});
                this.sendMessage("Created New Room");
            });
        }
    };
    deleteRoom=(roomId)=>{
        const {currentUser}=this.state;
        currentUser.leaveRoom({roomId}).then(currentUser=>this.setState(prevState=>({currentUser:prevState.currentUser})))

    };

    render() {
        const {
            roomId,
            currentUser,
            isLogged,
            loading
        } = this.state;

        if(loading){
            return (
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>)

        }else if(isLogged){
           return  <ChatComponent
                handleChange={this.handleChange}
                 deleteRoom={this.deleteRoom}
                 roomId={roomId}
                 user={currentUser}
                 makeRoom={this.makeRoom}
                 changeRoom={this.changeRoom}
                 sendMessage={this.sendMessage}
             />
         }else{
             return <LoggingWindow loadScreen={this.loadScreen} getLoginPassword={this.getLoginPassword} handleChange={this.handleChange}/>
         }
    }
}

export default App;