import React from "react";
import {connect} from "react-redux"
import {logOut,updateConnectedUser} from "../store/App/actions"

const mapStateToProps= (state) =>{
    return {
        loggedUser:state.app.loggedUser
    }
}

const mapDispatchToProps = {
    logOut,
    updateConnectedUser
};

class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            availableRooms: [],
            deleted:false
        }
    };
    addRoom(id){
    }

    deleteRoom(roomId){
        if(this.state.deleted){
            return
        }
        this.setState({deleted:true})
        this.props.user.leaveRoom({roomId}).then(()=> {
            this.setRooms()
            this.setState({deleted:false})
        })

    }

    setRooms() {
        const {loggedUser} = this.props;
        if(loggedUser) {
            const {rooms} = loggedUser;
            loggedUser.getJoinableRooms().then(avRooms=>{
                console.log(rooms)
                this.setState({availableRooms:avRooms,rooms})
            })
        }
    }

    componentDidMount(){
        this.setRooms()
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props){
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
                        <i><a className="join-room" href="#" onClick={()=> {
                             changeRoom(id);
                             this.addRoom(id)
                        }}>+</a></i>
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



export default connect(mapStateToProps,mapDispatchToProps)(Rooms);