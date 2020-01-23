import React, {Component} from "react";

class LoggingWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            isEmpty: false
        }
    }

    componentWillUnmount() {
        this.props.loadScreen();
    }

    emptyFieldCheck = (login, password) => {
        if (!login.trim().length || !password.trim().length) {
            this.setState({isEmpty: true})
            setTimeout(() => this.setState({isEmpty: false}), 3000)
            return true;
        }
        return false
    }

    render() {
        const {handleChange, checkLoginPassword, isIncorrect} = this.props;
        const {login, password, isEmpty} = this.state;
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
                               if (!this.emptyFieldCheck(login, password)) checkLoginPassword(login, password);
                           }}>
                        Log In
                    </a>
                </div>
            </div>
        )
    }
}

export {LoggingWindow}