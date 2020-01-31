import React from "react";
import {connect} from "react-redux"
import {logOut, setLoggedUser} from "../store/App/actions";
import AddUser from "./AddUser"

const mapStateToProps = (state) => {
    return {
        loggedUser: state.app.loggedUser
    }
}

const mapDispatchToProps = {
    logOut,
    setLoggedUser
};

class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            availableRooms: [],
            roomToAddTo: "",
            //TODO: ADD FLAG ON DELETEROOM FUNC
        };
    };

    componentDidMount() {
        this.setRooms()
    };

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setRooms()
        }
    };

    joinRoom(roomId) {
        const {loggedUser} = this.props;
        loggedUser.joinRoom({roomId})
            .then(() => this.setRooms())
    }


    cancel = () => {
        this.setState({roomToAddTo:""})
    }

    deleteRoom(roomId) {
        if (this.props.roomId === roomId) {
            return;
        }
        this.props.loggedUser.leaveRoom({roomId}).then(() => this.setRooms())

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

    displayRooms(rooms) {
        const {changeRoom} = this.props;
        if (rooms === this.state.availableRooms) {
            return rooms.map(({createdAt, name, id}) => {
                    return (
                        <li key={createdAt}>
                            <span> #{name}</span>
                            <i><a className="join-room" href="#" onClick={() => {
                                this.joinRoom(id);
                            }}>+</a></i>
                        </li>
                    )
                }
            )
        } else {
            return rooms.map(({createdAt, name, id}) => {
                return (
                    <li key={createdAt + 1}>
                        <span onClick={() => changeRoom(id)}> #{name}</span>
                        <i className="fas fa-user-plus" onClick={() => {
                            this.setState({roomToAddTo: id})
                        }}/>
                        <i onClick={() => this.deleteRoom(id)}><a href="#" className="close"/></i>
                    </li>
                )
            })
        }
    }

    render() {
        const {rooms, roomToAddTo, availableRooms} = this.state;
        return (
            <div className="rooms">
                {roomToAddTo ? <AddUser roomId={roomToAddTo} cancel={this.cancel}/> : null}
                <div className="logout">
                    <i className="fa fa-sign-out" onClick={this.props.logOut}/>
                </div>
                <div className="rooms-container">
                    <h2>Your Rooms:</h2>
                    <ul>
                        {this.displayRooms(rooms)}
                    </ul>
                </div>
                <div className="available-rooms">
                    <h2> Available rooms</h2>
                    <ul>
                        {this.displayRooms(availableRooms)}
                    </ul>
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Rooms);