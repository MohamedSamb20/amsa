import React from "react";

import "../../utilities.css";
import "./FriendsPage.css"

const FriendsPage = (props) => {
    return (<div className="FriendsPage-container">
                <div className="FriendsPage-search">
                    Insert search for friends
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