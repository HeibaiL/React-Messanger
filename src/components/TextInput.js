import React,{Component} from "react";
export default class TextInput extends Component{
    state={
        text:""
    }

    handleChange=(e)=>{
       const {className}=e.target;
       this.setState({[className]:e.target.value})
    }

    handleKeyPress=(e)=>{
        if(e.keyCode===13&&this.state.text.length>0){
            this.props.send(this.state.text)
            e.target.value=""
        }

    }
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress)
    }

    render(){
        return (
            <div className="input-block">
                <form>
                  <textarea className="text" onChange={this.handleChange}/>
                </form>
            </div>
        )
    }

}