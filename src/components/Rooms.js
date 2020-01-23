import React from "react";
import {connect} from "react-redux"
import {logOut} from "../store/App/actions"

const mapDispatchToProps = {
    logOut,
};

class Rooms extends React.Component {
    constructor(props){
    super(props);
    this.state = {
    rooms : [],
    availableRooms : []
        }
    };

    deleteRoom(roomId){
        this.props.user.leaveRoom({roomId})
        this.setRooms();
    }

    setRooms(){
        const {user} = this.props;
        if(user){
            console.log(user.rooms)
        }

        if(user){
            const {rooms,getJoinableRooms} = user
            this.setState({rooms});
            return user.getJoinableRooms().then(rooms => this.setState({availableRooms: rooms}))
        }
    };

    componentDidMount(){
        this.setRooms()
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
          this.setRooms()
        }
    }
    displayRooms(rooms) {
        const {changeRoom} = this.props;
        return rooms.map(({createdAt, name, id}) => {
            if(rooms === this.state.availableRooms){
                return (
                    <li key={createdAt} >
                        <span> #{name}</span>
                        <i><a className="join-room" href="#" onClick={()=>changeRoom(id)}>+</a></i>
                    </li>
                )
            }else{
                return (
                    <li key={createdAt} >
                        <span onClick={()=>changeRoom(id)}> #{name}</span>
                        <i onClick={() => this.deleteRoom(id)}><a href="#" className="close"/></i>
                    </li>
                    )
                }
            }
        )
    }

    render(){
        return (
            <div className="rooms">
                <div className="logout">
                  <i className="fa fa-sign-out" onClick={this.props.logOut}/>
                </div>
                <div className="rooms-container">
                    <h2>Your Rooms:</h2>
                    <ul>
                        {this.displayRooms(this.state.rooms)}
                    </ul>
                </div>
                <div className="available-rooms">
                    <h2> Available rooms</h2>
                    <ul>
                        {this.displayRooms(this.state. availableRooms)}
                    </ul>
                </div>
            </div>
        );
    }
}



export default connect(null,mapDispatchToProps)(Rooms);