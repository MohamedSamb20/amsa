import React from "react";

import FriendSearch from "../modules/FriendSearch";

import "../../utilities.css";
import "./FriendsPage.css"

const FriendsPage = (props) => {
    document.title = 'Friends'
    return (<div className="FriendsPage-container">
                <div className="FriendsPage-search">
                    <FriendSearch />
                </div>
                <div className="FriendsPage-requests">
                    Insert friend request
                </div>
                <div className="FriendsPage-list">
                    Insert list of friends
                </div>
        </div>
    );
}

export default FriendsPage;