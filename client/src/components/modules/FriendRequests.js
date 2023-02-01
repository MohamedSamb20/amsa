import React, {useState, useEffect} from "react";

import { get, post } from "../../utilities";
import WorkoutRequestPopup from "./WorkoutRequestPopup";

import "../../utilities.css";
import "./FriendRequests.css";

const FriendRequests = (props) => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [pendingFriendRequests, setPendingFriendRequests] = useState([]);
    const [workoutRequests, setWorkoutRequests] = useState([]);
    const [pendingWorkoutRequests, setPendingWorkoutRequests] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [data, setData] = useState({});
    const [requestingUsers, setRequestingUsers] = useState([])
    const [popupUser, setPopupUser] = useState({})
    useEffect(() => {
        get("/api/friendrequests", {userId: props.userId})
        .then((requestsList) => requestsList.map((request) => get("/api/user", {userId: request.requester})))
        .then(async (users) => {
            const requestingUsers = await Promise.all(users);
            setFriendRequests( requestingUsers);
        });
        get("/api/workoutrequests", {userId: props.userId})
        .then((requests) => {
            setWorkoutRequests(requests)
            return requests
        })
        .then((requestsList) => requestsList.map((request) => get("/api/user", {userId: request.requester})))
        .then(async (users) => {
            const requestingUsers = await Promise.all(users);
            setRequestingUsers( requestingUsers);
        });
        get("/api/outgoingrequests", {userId: props.userId})
        .then((requestsList) => requestsList.map((request) => get("/api/user", {userId: request.userId})))
        .then(async (users) => {
            const requestingUsers = await Promise.all(users);
            setPendingFriendRequests( requestingUsers);
        });
    }, [props.friendsNumber]);
    const addFriendship = (event) => {
        const promise1 = post("/api/friend", { userId: props.userId, friendId: event.target.id});
        const promise2 = post("/api/friend", { friendId: props.userId, userId: event.target.id});
        const promise3 = post("api/removefriendrequest", { userId: props.userId, requester: event.target.id});
        Promise.all([promise1, promise2, promise3]).then(() => {
            props.setFriendsNumber((prevFriendsNumber) => prevFriendsNumber + 1);
        });
    }
    const deleteRequest = (event) => {
        const body = { requester: props.userId, userId: event.target.id};
        const promise1 = post("api/removefriendrequest", body);
        Promise.all([promise1]).then(() => {
            props.setFriendsNumber((prevFriendsNumber) => prevFriendsNumber + 1);
        });
    }
    const openPopup = (event) => {
        const requestToOpen = workoutRequests.find((request) => request.requester === event.target.id);
        const user = requestingUsers.find((user) => user._id === event.target.id);
        setData(requestToOpen);
        console.log(user);
        setPopupUser(user);
        setShowPopup(true);

    }
    return (<div className="FriendRequest-container">
                <div >Incoming Requests:</div>
                {friendRequests.map((person) => {
                    return (<div>
                            Friend Request From: 
                            <img className="" src={person.photo} />
                            {person.name} 
                            <button id={person._id} onClick={addFriendship}>Accept</button>
                        </div>)
                })}
                {requestingUsers.map((requester, i) => {
                    return (<div key={i}>
                            Workout Request From: 
                            <img className="" src={requester.photo} /> 
                            {requester.name} 
                            <button id={requester._id} onClick={openPopup}>Open</button>
                        </div>);
                })}
                <div >Pending Requests:</div>
                {pendingFriendRequests.map((person) => {
                    return (<div>
                            Friend Request To: 
                            <img className="FriendRequest-image" src={person.photo} />
                            {person.name} 
                            <button id={person._id} onClick={deleteRequest}>Cancel</button>
                        </div>)
                })}
                {showPopup? <WorkoutRequestPopup setFriendsNumber={props.setFriendsNumber} userId={props.userId} requesterName={popupUser.name} requester={data.requester} time={data.time} routine={data.routine} notes={data.notes} setShowPopup={setShowPopup}/>: <></>}
        </div>
    );
}

export default FriendRequests;