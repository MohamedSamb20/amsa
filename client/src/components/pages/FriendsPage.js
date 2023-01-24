import React, {useState, useEffect} from "react";
import FriendSearch from "../modules/FriendSearch";
import FriendRequests from "../modules/FriendRequests";
import CurrentFriends from "../modules/CurrentFriends";

import "../../utilities.css";
import "./FriendsPage.css"

const FriendsPage = (props) => {
    document.title = 'Friends';
    const [friendsNumber, setFriendsNumber] = useState(0);
    return (<div className="FriendsPage-container">
                <div className="FriendsPage-search">
                    <FriendSearch userId={props.userId} 
                    friendsNumber= {friendsNumber}
                    setFriendsNumber = {setFriendsNumber} />
                </div>
                <div className="FriendsPage-requests">
                    <FriendRequests userId={props.userId}
                    friendsNumber= {friendsNumber}
                    setFriendsNumber = {setFriendsNumber} />
                </div>
                <div className="FriendsPage-list">
                    <CurrentFriends userId={props.userId}
                    friendsNumber= {friendsNumber}
                    setFriendsNumber = {setFriendsNumber} />
                </div>
        </div>
    );
}

export default FriendsPage;