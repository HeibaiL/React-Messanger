import React,{Component} from "react";

class LoggingWindow extends Component{
    constructor(props) {
        super(props);
        this.state={
            login:"",
            password:""
        }
    }
    componentWillUnmount() {
        this.props.loadScreen();
    }

    emptyFieldCheck(value){

    }

    render(){
        const {handleChange,getLoginPassword}=this.props;
        return (
            <div className="container validation">
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
                    <a className="button" onClick={()=>getLoginPassword(this.state.login, this.state.password)}>
                        Log In
                    </a>
                </div>
        </div>
        )
    }
}

export  {LoggingWindow}