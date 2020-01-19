import React from "react";

class Rooms extends React.Component {
    constructor(props){
    super(props);
    this.state = {
    rooms : [],
    availableRooms : []
        }
    }

    componentDidUpdate(prevProps) {
        const {rooms,getJoinableRooms}=this.props.user;
        if(prevProps !== this.props) {
            this.props.user.getJoinableRooms().then(rooms => this.setState({availableRooms: rooms}))
            this.setState({rooms})
        }

    }

    displayRooms(rooms) {
        const {deleteRoom, changeRoom} = this.props;
        return rooms.map(({createdAt, name, roomId, id}) => {
                return (
                    <li key={createdAt} >
                        <span onClick={() =>changeRoom(name)}> #{name}</span>
                        <i onClick={() => deleteRoom(id)}><a href="#" className="close"/></i>
                    </li>
                )
            }
        )
    }

    render(){
        return (
            <div className="rooms">
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
};



export default Rooms;