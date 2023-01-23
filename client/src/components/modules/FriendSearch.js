import React, {useState} from "react";

import { get } from "../../utilities";

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
            console.log(searchResult)
        });
        setValue("");
      };

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
                {people.map((person) => {
                    return (<div>{person.name}</div>)
                })}
        </div>
    );
}

export default FriendSearch;