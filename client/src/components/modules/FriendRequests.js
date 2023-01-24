import React, {useState, useEffect} from "react";

import { get, post } from "../../utilities";

import "../../utilities.css";
import "./FriendRequests.css";

const FriendRequests = (props) => {
    const [requests, setRequests] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    useEffect(() => {
        get("/api/friendrequests", {userId: props.userId})
        .then((requestsList) => requestsList.map((request) => get("/api/user", {userId: request.requester})))
        .then(async (users) => {
            const requestingUsers = await Promise.all(users);
            setRequests( requestingUsers);
        });
        get("/api/outgoingrequests", {userId: props.userId})
        .then((requestsList) => requestsList.map((request) => get("/api/user", {userId: request.userId})))
        .then(async (users) => {
            const requestingUsers = await Promise.all(users);
            setPendingRequests( requestingUsers);
        });
    }, []);
    const addFriendship = (event) => {
        post("/api/friend", { userId: props.userId, friendId: event.target.id});
        post("/api/friend", { friendId: props.userId, userId: event.target.id});
        post("api/removefriendrequest", { userId: props.userId, requester: event.target.id});
    }
    const deleteRequest = (event) => {
        const body = { requester: props.userId, userId: event.target.id};
        post("api/removefriendrequest", body);
    }
    return (<div className="FriendRequest-container">
                <div >Incoming Requests:</div>
                {requests.map((person) => {
                    return (<div>
                            {person.name} 
                            <button id={person._id} onClick={addFriendship}>Accept</button>
                        </div>)
                })}
                <div >Pending Requests:</div>
                {pendingRequests.map((person) => {
                    return (<div>
                            {person.name} 
                            <button id={person._id} onClick={deleteRequest}>Cancel</button>
                        </div>)
                })}
        </div>
    );
}

export default FriendRequests;