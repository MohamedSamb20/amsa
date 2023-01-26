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
    }, [props.friendsNumber]);

    const deleteFriendship = (event) => {
      const promise1 = post("/api/removefriend", { userId: props.userId, friendId: event.target.id});
      const promise2 = post("/api/removefriend", { friendId: props.userId, userId: event.target.id});
      Promise.all([promise1, promise2]).then(() => {
        props.setFriendsNumber((prevFriendsNumber) => prevFriendsNumber + 1);
      });
  }
  return (
    <div className="CurrentFriends-container">
      <div>Current Friends:</div>
      {friends.map((person) => {
                    return (<div>
                            {person.name} 
                            {/* <button id={person._id} >Request Workout</button> */}
                            <button id={person._id} onClick ={deleteFriendship} >Delete Friend</button>
                        </div>)
                })}
    </div>
  );
}

export default CurrentFriends;