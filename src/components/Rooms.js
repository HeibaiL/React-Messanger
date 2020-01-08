import React,{Component} from "react";
export default class Rooms extends Component{
    render(){
        return (
            <div className="rooms">
                <div className="rooms-container">
                    <h2>Your Rooms:</h2>
                    <ul>
                        <li># room1</li>
                        <li># room2</li>
                        <li># room3</li>
                        <li># room4</li>
                    </ul>
                </div>
                
            </div>
        )
    }
}