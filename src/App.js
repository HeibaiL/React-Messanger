import React, {Component} from 'react';
import {connect} from "react-redux"

import './App.css';
import {users} from "./users"
import {LoggingWindow} from "./components/LoggingWindow";
import ChatComponent from "./components/ChatComponent";
import {setCurrentUser,logOut} from "./store/App/actions";


const mapStateToProps = state => {
    return {
        currentUser: state.app.currentUser
    }
};

const mapDispatchToProps = {
    setCurrentUser,
};

class App extends Component {
    state = {
        loading:false,
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
        const {loading,isIncorrect} = this.state;
        const {currentUser} = this.props;
        if(loading){
            return (
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>)
        }else if(currentUser){
           return  <ChatComponent
               handleChange={this.handleChange}
               user={currentUser}
             />
         }else{
             return <LoggingWindow
             isIncorrect={isIncorrect}
             loadScreen={this.loadScreen}
             checkLoginPassword={this.checkLoginPassword} handleChange={this.handleChange}/>
         }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);