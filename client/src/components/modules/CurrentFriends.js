import React, { useState, useEffect } from "react";


import { get, post } from "../../utilities";
import "../../utilities.css";
import "./CurrentFriends.css"


const CurrentFriends = (props) =>  {
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        get("/api/friends", {userId : props.userId})
        .then((friendsList) => friendsList.map((request) => get("/api/user", {userId: request.userId})))
        .then(async (users) => {
            const requestingUsers = await Promise.all(users);
            setPendingRequests( requestingUsers);
        });
    }, []);
  return (
    <div className="CurrentFriends-container">
      <div>Current Friends:</div>
      {friends.map((person) => {
                    return (<div>
                            {person.name} 
                            <button id={person._id} >Request Workout</button>
                        </div>)
                })}
    </div>
  );
}

export default CurrentFriends;