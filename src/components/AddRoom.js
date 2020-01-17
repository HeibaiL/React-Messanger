import React,{Component} from "react";
export default class AddRoom extends Component{
    state={
        active:false,
        inputText:""
    }
    addRoomFn=(e)=>{
        let el = e.target;
        if(el.className=="add-room"||el.parentElement.className=="add-room"){
            this.setState({active:true})
        }

    }
    handleChange=(e)=>{
        const {className}=e.target;
        this.setState({[className]:e.target.value})
    }

    cancel=()=>{
        this.setState({active:false})
    }
    render(){
        return (
            <div onClick={this.addRoomFn} className="add-room">
                {this.state.active?
                    <div className="room-element">
                        <div className="create-room">
                            <h2>
                                Enter Room Name
                            </h2>
                            <input className="inputText" onChange={this.handleChange}/>
                            <div className="room-buttons">
                                <a onClick={this.cancel}>
                                     Cancel
                                </a>
                                <a onClick={() => {
                                    this.props.makeRoom(this.state.inputText)
                                    this.cancel()}
                                }>
                                    Confirm
                                </a>
                            </div>
                        </div>
                    </div>:
                    null
                }
                <p>Add Room</p>
                <p>+</p>
            </div>
        )
    }

}