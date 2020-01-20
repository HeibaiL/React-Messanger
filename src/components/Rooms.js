import React from "react";

class Rooms extends React.Component {
    constructor(props){
    super(props);
    this.state = {
    rooms : [],
    availableRooms : []
        }
    }

    setRooms(){
        if(this.props.user){
            const {rooms,getJoinableRooms} = this.props.user;
            this.setState({rooms});
            return getJoinableRooms().then(rooms => this.setState({availableRooms: rooms}))
        }
    }
    componentDidMount(){
        this.setRooms()
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
          this.setRooms()
        }
    }
    //TODO: UNSUBSCRIBE ON WILLUNMOUNT METHOD
    // componentWillUnmount() {
    //     console.log(this.props.user.subscribtions)
    // }

    displayRooms(rooms) {
        const {deleteRoom, changeRoom} = this.props;
        return rooms.map(({createdAt, name, id}) => {
            if(rooms === this.state.availableRooms){
                return (
                    <li key={createdAt} >
                        <span onClick={ ()=>console.log("qq")}> #{name}</span>
                        <i><a>join</a></i>
                    </li>
                )
            }else{
                return (
                    <li key={createdAt} >
                        <span onClick={rooms === this.state.availableRooms? ()=>console.log("qq"):() =>changeRoom(id)}> #{name}</span>
                        <i onClick={() => deleteRoom(id)}><a href="#" className="close"/></i>
                    </li>
                    )
                }
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
}



export default Rooms;