import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./HomePage.css";

const Settings = (props) => {
  document.title = 'Settings'
  const set = {
    weightUnit: "",
    heightUnit: "",
    weight: 0,
    height: 0,
  };
  const [data, setData] = useState(set);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleReset = (event) => {
    setData(set);
  };

  const sendData = (e) => {
    e.preventDefault();
    const body = {
      userId: props.userId,
      weightUnit: data.weightUnit,
      heightUnit: data.heightUnit,
      height: data.height,
      weight: data.weight,
    };
    console.log(body);
    post("/api/settings", body).then((res) => console.log(res));

    console.log("done");
  };
  return (
    <div className="HomePage-container">
      <form onSubmit={sendData}>
        <div className="category-container">
          <p>Select Height Unit</p>
          <input
            type="text"
            name="heightUnit"
            value={data.heightUnit}
            onChange={handleInputChange}
          />

          <div className="second-box">
            <p>Select Weight Unit</p>
            <input
              type="text"
              name="weightUnit"
              value={data.weightUnit}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <p>Set Height</p>
            <input
              type="text"
              name="height"
              value={data.height}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p>Set Weight</p>
            <input
              type="text"
              name="weight"
              value={data.weight}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Save</button>
        </div>
      </form>
      <button type = 'reset' onClick = {handleReset}> Reset </button>
    </div>
  );
};

export default Settings;