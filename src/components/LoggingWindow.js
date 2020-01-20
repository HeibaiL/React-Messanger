import React,{Component} from "react";

class LoggingWindow extends Component{
    constructor(props) {
        super(props);
        this.state={
            login:"",
            password:"",
            isEmpty:false
        }
    }
    componentWillUnmount() {
        this.props.loadScreen();
    }

    emptyFieldCheck=(login,password)=>{
        login = login.trim();
        password = password.trim();
        if(login.length<1||password.length<1){
            this.setState({isEmpty:true})
            setTimeout(()=>this.setState({isEmpty:false}),3000)
            return true;
        }
    }

    render(){
        const {handleChange,getLoginPassword} = this.props;
        const {login,password,isEmpty} = this.state;
        return (
            <div className="container validation">
                {isEmpty? <div className="onEmpty">
                    <p>Please, fill in all fields</p>
                    </div>:
                    null
                }
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
                    <a className="button"
                       onClick={
                           ()=>{if(!this.emptyFieldCheck(login,password)) getLoginPassword(login, password);
                    }}>
                        Log In
                    </a>
                </div>
        </div>
        )
    }
}

export  {LoggingWindow}