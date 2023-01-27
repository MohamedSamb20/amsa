import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./HomePage.css";

const Settings = (props) => {
  document.title = 'Settings';
  const [message, setMessage] = useState('');
  const [data, setData] = useState('');
  useEffect(() => {
    get("/api/settings", {userId :props.userId}).then((setting) => {
      if (setting === false) {setting = {
        weight: 'Not set',
        height : 'Not set',
        heightUnit : '',
        weightUnit : ''
      }};
      setData(setting);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleReset = (event) => {
    setData(set);
    setMessage('Settings Reset!')
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
    setMessage('Saved!')
  };
  return (
    <div className="HomePage-container">
      <form onSubmit={sendData} onReset = {handleReset}>
        <div className="category-container">
          <p>Select Height Unit</p>
          <input
            type="text"
            name="heightUnit"
            value={data.heightUnit}
            placeholder='Enter a Height Unit'
            onChange={handleInputChange}
          />

          <div className="second-box">
            <p>Select Weight Unit</p>
            <input
              type="text"
              name="weightUnit"
              value={data.weightUnit}
              placeholder='Enter a Weight Unit'
              onChange={handleInputChange}
            />
          </div>

          <div>
            <p>Set Height</p>
            <input
              type="number"
              name="height"
              value={data.height}
              onChange={handleInputChange}
              placeholder='Enter your height'
            />
          </div>
          <div>
            <p>Set Weight</p>
            <input
              type="number"
              name="weight"
              value={data.weight}
              onChange={handleInputChange}
              placeholder="Enter your weight"
            />
          </div>

          <button type="submit">Save</button>
          <button type = 'reset'> Reset </button>
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
};

export default Settings;