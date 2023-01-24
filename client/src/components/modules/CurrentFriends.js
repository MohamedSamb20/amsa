import React, { useState, useEffect } from "react";


import { get, post } from "../../utilities";
import "../../utilities.css";
import "./CurrentFriends.css"


const CurrentFriends = (props) =>  {
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        get("/api/friends", {userId : props.userId})
        .then((friendsList) => friendsList.map((friendship) => get("/api/user", {userId: friendship.friendId})))
        .then(async (users) => {
            const friendsUsers = await Promise.all(users);
            setFriends( friendsUsers);
        });
    }, []);
  return (
    <div className="CurrentFriends-container">
      <div>Current Friends:</div>
      {friends.map((person) => {
                    return (<div>
                            {person.name} 
                            <button id={person._id} >Request Workout</button>
                            <button id={person._id} >Delete Friend</button>
                        </div>)
                })}
    </div>
  );
}

export default CurrentFriends;