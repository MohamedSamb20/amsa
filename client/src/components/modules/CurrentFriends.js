import React, { useState, useEffect } from "react";

import WorkoutRequestForm from "./WorkoutRequestForm";

import { get, post } from "../../utilities";
import "../../utilities.css";
import "./CurrentFriends.css"


const CurrentFriends = (props) =>  {
  const [friends, setFriends] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [requestee, setRequestee] = useState(undefined);
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

  const openRequestBox = (event) => {
    setRequestee(event.target.id)
    setShowForm(true);
  }

  return (
    <div className="CurrentFriends-container">
      <table>
        <tbody>
          <tr>
            <th>Friends</th>
            <th>Streak</th>
          </tr>
          {friends.map(person => {
            return <tr>
                <td>{person.name}</td>
                <td>{person.streak}</td>
                <button id ={person._id} onClick={openRequestBox}>Request Workout</button>
                <button id ={person._id} onClick={deleteFriendship}>Delete Friend </button>
              </tr>
          })}
        </tbody>
      </table>
      {showForm? <WorkoutRequestForm requester={props.userId} requestee={requestee} setShowForm={setShowForm}/> : <></>}
    </div>
  );
}

export default CurrentFriends;