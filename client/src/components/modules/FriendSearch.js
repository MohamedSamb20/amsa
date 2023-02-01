import React, {useState} from "react";

import { get, post } from "../../utilities";
import {RiUserSearchLine} from 'react-icons/ri';
import {MdPersonAddAlt} from 'react-icons/md';

import "../../utilities.css";
import "./FriendSearch.css"

const FriendSearch = (props) => {
    const [value, setValue] = useState("");
    const [people, setPeople] = useState([]);
    const [idToUsername, setIdToUsername] = useState({});
    const handleChange = (event) => {
        setValue(event.target.value);
      };
    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {value: value};
        get("/api/people", body).then((searchResult)=>{
            setPeople(searchResult);
            return searchResult.map((user) => {
                return get("/api/settings", {userId: user._id}).then((settings) => [user._id, settings.username])
            })
        }).then(async (prePairing) => {
            const IDToUser = {};
            const pairing = await Promise.all(prePairing);
            for(const pair of pairing){
                IDToUser[pair[0]] = pair[1];
            }
            setIdToUsername(IDToUser);
        });
        setValue("");
      };
    const handleFriendRequest = (event)=>{
        const body = {
            user: props.userId,
            requestee: event.target.id,
        }
        post("/api/friendrequest", body).then((request) => {
            props.setFriendsNumber((prevFriendsNumber) => prevFriendsNumber + 1);
        })
    }

    return (<div className="FriendSearch-container">
                <div >Search the site:</div>
                <div className="FriendSearch-searchbar">
                    <input type="text" placeholder="Search for a users name" value={value} onChange={handleChange} className="FriendSearch-input" />
                    <button type="submit" className="FriendSearch-button u-pointer" value="Submit" onClick={handleSubmit}>
                        <RiUserSearchLine />
                    </button>
                </div>
                {people.filter((person) => person._id !== props.userId).map((person) => {
                    return (<div>
                            <img className="FriendSearch-image" src={person.photo} />
                            {person.name} {(idToUsername[person._id])? `(${idToUsername[person._id]})` : ''}
                            <button className="FriendSearch-request" id={person._id} onClick={handleFriendRequest}>
                                +Add
                            </button>
                        </div>)
                })}
        </div>
    );
}

export default FriendSearch;