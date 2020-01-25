import React from "react";
import {connect} from "react-redux"
import {logOut, updateConnectedUser} from "../store/App/actions";
import {store} from "../index";

const mapStateToProps = (state) => {
    return {
        loggedUser: state.app.loggedUser
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
            deleted: false
        }
    };
    addRoom(roomId){
        const {loggedUser} = this.props;
        loggedUser.joinRoom({roomId}).then(()=>this.setRooms())
    }

    deleteRoom(roomId) {
        if (this.state.deleted) {
            return;
        }
        if (this.props.roomId === roomId) {
            return;
        }
            this.setState({deleted: true})
            this.props.loggedUser.leaveRoom({roomId}).then(() => {
                this.setRooms()
                this.setState({deleted: false})
            })
    }

    setRooms() {
        const {loggedUser} = this.props;
        if (loggedUser) {
            const {rooms} = loggedUser;
            loggedUser.getJoinableRooms().then(avRooms => {
                this.setState({availableRooms: avRooms, rooms})
            })
        }
    }

    componentDidMount() {
        this.setRooms()
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setRooms()
        }
    }

    displayRooms(rooms) {
        const {changeRoom} = this.props;
        if (rooms === this.state.availableRooms) {
                return rooms.map(({createdAt, name, id}) => {
                        return (
                            <li key={createdAt + 1}>
                                <span> #{name}</span>
                                <i><a className="join-room" href="#" onClick={() => {
                                    changeRoom(id);
                                    this.addRoom(id);
                                }}>+</a></i>
                            </li>
                        )
                    }
                )
        } else {
            return rooms.map(({createdAt, name, id}) => {
                return (
                    <li key={createdAt}>
                        <span onClick={() => changeRoom(id)}> #{name}</span>
                        <i onClick={() => this.deleteRoom(id)}><a href="#" className="close"/></i>
                    </li>
                )
            })
        }
    }

    render() {
    console.log(this.props)
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
                        {this.displayRooms(this.state.availableRooms)}
                    </ul>
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Rooms);