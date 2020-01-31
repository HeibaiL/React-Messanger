import React,{Component} from "react";

export default class TextInput extends Component{
    state={
        text:""
    };

    sendMessage = (message) => {
        const {roomId} = this.props;
        this.props.user.sendSimpleMessage({
            roomId,
            text: message,
        });
    };

    componentDidMount() {
        document.addEventListener("keydown", (e)=>{
        if(e.keyCode===13&&this.state.text.length>0){
            this.sendMessage(this.state.text)
            e.target.value=""
        }
    })
    };

    render(){
        return (
            <div className="input-block">
                <form>
                  <textarea name="text" className="text" onChange={this.props.handleChange.bind(this)}/>
                </form>
            </div>
        )
    }

}