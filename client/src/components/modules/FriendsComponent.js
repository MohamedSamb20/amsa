import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import SingleFriend from "./SingleFriend.js"


const Friends = (props) =>  {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
      get("/api/friends", {userId : props.userId})
      .then((friendsList) => friendsList.map((friendship) => get("/api/user", {userId: friendship.friendId})))
      .then(async (users) => {
          const friendsUsers = await Promise.all(users);
          setFriends( friendsUsers);
      });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away

  let friendsList = null;
  const hasFriends = friends.length !== 0;
  if (hasFriends) {
    friendsList = friends.map((friend) => (
        <SingleFriend
          userId = {friend._id}
          name = {friend.name}
        />
      ));
  } else {
    friendsList = <div>You have no friends!</div>;
  }
  return (
    <>
      <> Friends: </>
      {friendsList}
      <button type='Add'>+Add Friend</button>
    </>
  );
}

export default Friends;