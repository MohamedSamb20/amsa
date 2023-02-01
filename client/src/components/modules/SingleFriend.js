import React from "react";

import "./SingleFriend.css"


const SingleFriend = (props) => {
    return (
        <div className="SingleFriend-container">
            <img className="SingleFriend-image" src={props.photo} />
            <div>{props.name}</div>
            <div>Streak: {props.streak}</div>
        </div>
    )
}

export default SingleFriend;