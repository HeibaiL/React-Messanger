import React, {Component} from 'react';

import './App.css';
import {users} from "./users"
import {LoggingWindow} from "./components/LoggingWindow";
import ChatComponent from "./components/ChatComponent";


class App extends Component {
    state = {
        loading:false,
        isLogged:false,
        isIncorrect:false,
    };

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

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
            this.props.setCurrentUser(user);
            this.setState( {loading:true})
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

    render() {
        const {
            roomId,
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
                 user={this.props.currentUser}
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