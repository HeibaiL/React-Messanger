import React,{Component} from "react";

export default class TextInput extends Component{
    state={
        text:""
    };

    handleKeyPress=(e)=>{
        if(e.keyCode===13&&this.state.text.length>0){
            this.props.sendMessage(this.state.text);
            e.target.value=""
        }

    };
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress)
    }

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