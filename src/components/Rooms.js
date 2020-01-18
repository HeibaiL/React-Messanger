import React from "react";

const Rooms = ({ rooms = [], changeRoom,deleteRoom }) => (

    <div className="rooms">
        <div className="rooms-container">
            <h2>Your Rooms:</h2>
            <ul>
                {rooms.map(({createdAt, name,roomId,id}) => {
                        return(
                            <li
                                key={createdAt}
                            >
                                <span  onClick={() => changeRoom(name)}> #{name}</span>
                                <i onClick={()=>deleteRoom(id)}><a href="#" className="close"/></i>
                            </li>
                        )
                }

                )}
            </ul>
        </div>

    </div>
);

export default Rooms;