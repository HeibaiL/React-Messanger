import React from "react";
import {connect} from "react-redux"
import {logOut, setLoggedUser} from "../store/App/actions";

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
            deleted: false
        }
    };

    componentDidMount() {
        this.setRooms()
    };

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setRooms()
        }
    };

    joinRoom(roomId){
        const {loggedUser} = this.props;
        loggedUser.joinRoom({roomId})
            .then(()=>this.setRooms())
    }

    deleteRoom(roomId) {
        if (this.props.roomId === roomId) {
            return;
        }
        this.setState({deleted: true})
        this.props.loggedUser.leaveRoom({roomId}).then(() => {
            this.setRooms();
        }).then( this.setState({deleted: false}));
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
                    <li key={createdAt}>
                        <span onClick={() => changeRoom(id)}> #{name}</span>
                        <i className="fas fa-user-plus"></i>
                        <i onClick={!this.state.deleted?() => this.deleteRoom(id):null}><a href="#" className="close"/></i>
                    </li>
                )
            })
        }
    }

    render() {
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