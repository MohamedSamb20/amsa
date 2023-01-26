import React, {useState} from "react";

import { get, post } from "../../utilities";

import "../../utilities.css";
import "./FriendSearch.css"

const FriendSearch = (props) => {
    const [value, setValue] = useState("");
    const [people, setPeople] = useState([]);
    const handleChange = (event) => {
        setValue(event.target.value);
      };
    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {value: value};
        get("/api/people", body).then((searchResult)=>{
            setPeople(searchResult);
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
                <input type="text"
                        placeholder={props.defaultText}
                        value={value}
                        onChange={handleChange}
                        className="FriendsSearch-input" />
                <button
                    type="submit"
                    className="NewPostInput-button u-pointer"
                    value="Submit"
                    onClick={handleSubmit}
                >Search</button>
                {people.filter((person) => person._id !== props.userId).map((person) => {
                    return (<div>
                            {person.name}
                            <button id={person._id} onClick={handleFriendRequest}>Request</button>
                        </div>)
                })}
        </div>
    );
}

export default FriendSearch;