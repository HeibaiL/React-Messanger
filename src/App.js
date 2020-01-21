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
        currentUser: undefined,
        isIncorrect:false
    };
    showError(){
        this.setState({isIncorrect:true})
        setTimeout(()=>this.setState({isIncorrect:false}),2000)
    }

    checkLoginPassword=(login, password)=>{
        login = login.toString();
        password = password.toString();
          let user = users.filter( user => {
              if (user.login === login) {
                  if (user.password === password) return user
              }
          })[0]
        if(user){
            this.setState({currentUser:user, loading:true})
            return user
        }else this.showError()
    }

    loadScreen=()=>{
            setTimeout(() => this.setState(
                {
                    loading: false,
                    isLogged:true
                }
            ), 1500)
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

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
                 user={currentUser}
             />
         }else{
             return <LoggingWindow
                 isIncorrect={this.state.isIncorrect}
                 loadScreen={this.loadScreen}
                 checkLoginPassword={this.checkLoginPassword} handleChange={this.handleChange}/>
         }
    }
}

export default App;