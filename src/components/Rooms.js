import React from "react";

const Rooms = ({ rooms = [], changeRoom }) => (

    <div className="rooms">
        <div className="rooms-container">
            <h2>Your Rooms:</h2>
            <ul>
                {rooms.map(({createdAt, name}) => (
                        <li
                            key={createdAt}
                            onClick={() => changeRoom(name)}
                        >
                            #{name}
                        </li>
                    )
                )}
            </ul>
        </div>

    </div>
);

export default Rooms;