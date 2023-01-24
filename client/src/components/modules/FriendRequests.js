import React, {useState} from "react";

import { get, post } from "../../utilities";

import "../../utilities.css";
import "./FriendRequests.css";

const FriendRequests = (props) => {
    const [requests, setRequests] = useState([]) 
    get("/api/friendrequests", {userId: props.userId}).then((requestsList) => setRequests(requestsList));
    return (<div className="FriendRequest-container">
                <div >Requests:</div>
                {requests.map((person) => {
                    return (<div>
                            {person.name} 
                            <button id={person._id} >Accept</button>
                        </div>)
                })}
        </div>
    );
}

export default FriendRequests;