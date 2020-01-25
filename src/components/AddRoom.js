import React,{Component} from "react";

class AddRoom extends Component{
    state={
        active:false,
        inputText:""
    };
    addRoomFn=(e)=>{
        let el = e.target;
        if(el.className === "add-room"||el.parentElement.className === "add-room"){
            this.setState({active:true})
        }
    };
    cancel=()=>{
        this.setState({active:false})
    };
    render(){
        const {handleChange, makeRoom}=this.props;
        return (
            <div onClick={this.addRoomFn} className="add-room">
                {this.state.active?
                    <div className="container">
                        <div className="create-room">
                            <h2>
                                Enter Room Name
                            </h2>
                            <input className="inputText" name="inputText" onChange={handleChange.bind(this)}/>
                            <div className="room-buttons">
                                <a className="button" onClick={this.cancel}>
                                     Cancel
                                </a>
                                <a className="button" onClick={() => {
                                    makeRoom(this.state.inputText);
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

export default AddRoom;