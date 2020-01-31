import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

const mapStateToProps = state => (
    {loggedUser: state.app.loggedUser}
);

function AddUser(props) {
    const [userName, setUserName] = useState("");
    const handleChange = e => {
        setUserName(e.target.value)
    }

    function addUserFn(userId) {
        const {roomId} = props
        props.loggedUser.addUserToRoom({
            userId,
            roomId
        })
            .then(() => {
                props.cancel()
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div className="container">
            <div className="add-user">
                <h2> Add user to {props.roomId} </h2>
                <input className="inputText" onChange={handleChange}/>
                <div className="buttons-set">
                    <a className="button" onClick={props.cancel}>Cancel</a>
                    <a className="button" onClick={() => addUserFn(userName)}>Confirm</a>
                </div>
            </div>
        </div>

    )
}

export default connect(mapStateToProps, null)(AddUser);