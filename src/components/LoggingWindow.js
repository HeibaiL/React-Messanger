import React,{Component} from "react";

class LoggingWindow extends Component{
    render(){
        return (
            <div className="container validation">
                <div className="field">
                    <div className="login">
                        <h2>
                            Your Login
                        </h2>
                        <input className="inputText" onChange={this.handleChange}/>
                    </div>
                    <div className="password">
                        <h2>
                            Your Password
                        </h2>
                        <input type="password" className="inputText" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="login-buttons">
                    <a className="button">
                        Cancel
                    </a>
                    <a className="button">
                        Log In
                    </a>
                </div>
        </div>
        )
    }
}

export  {LoggingWindow}