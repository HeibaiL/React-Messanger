import React,{Component} from "react";

export default function Rooms (props){

    const renderRooms=user=>{
      if(user){
          return user.rooms.map((room,index)=>{
              return <li key={index}>{room.name}</li>
          })
      }
    }
        return (
            <div className="rooms">
                <div className="rooms-container">
                    <h2>Your Rooms:</h2>
                    <ul>
                        {renderRooms(props.user)}
                        {/*<li># room1</li>*/}
                        {/*<li># room2</li>*/}
                        {/*<li># room3</li>*/}
                        {/*<li># room4</li>*/}
                    </ul>
                </div>
                
            </div>
        )
}