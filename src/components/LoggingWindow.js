import React, {Component} from "react";
import {connect} from "react-redux";

import {users} from "../users";
import {setCurrentUser} from "../store/App/actions";

const mapDispatchToProps={
    setCurrentUser
}

class LoggingWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            isEmpty: false,
            isIncorrect:""
        }
    }

    componentWillUnmount() {
    this.props.loadScreen();
    }

    showError(){
        this.setState({isIncorrect:true})
        setTimeout(()=>this.setState({isIncorrect:false}),2000)
    }

    emptyFieldCheck = (login, password) => {
        if (!login.trim().length || !password.trim().length) {
            this.setState({isEmpty: true})
            setTimeout(() => this.setState({isEmpty: false}), 3000)
            return true;
        }
        return false
    };

    checkLoginPassword=(login, password)=>{
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

    render() {

        const {handleChange} = this.props;
        const {login, password, isEmpty, isIncorrect} = this.state;
        return (
            <div className="container validation">
                {isEmpty ?
                    <div className="onEmpty">
                        <p>Please, fill in all fields</p>
                    </div> : null}
                {isIncorrect ? <div className="onEmpty">
                    <p>Incorrect login or password</p>
                </div> : null}
                <div className="field">
                    <div className="login">
                        <h2>
                            Your Login
                        </h2>
                        <input name="login" onChange={handleChange.bind(this)}/>
                    </div>
                    <div className="password">
                        <h2>
                            Your Password
                        </h2>
                        <input type="password" name="password" onChange={handleChange.bind(this)}/>
                    </div>
                </div>
                <div className="login-button">
                    <a className="button" href="#"
                       onClick={
                           () => {
                               if (!this.emptyFieldCheck(login, password)) this.checkLoginPassword(login, password);
                           }}>
                        Log In
                    </a>
                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(LoggingWindow)