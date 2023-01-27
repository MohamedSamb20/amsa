import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./HomePage.css";

const Settings = (props) => {
  document.title = 'Settings';
  const [message, setMessage] = useState('');
  const [data, setData] = useState('');
  const [prev, setPrev] = useState('')
  useEffect(() => {
    get("/api/settings", {userId :props.userId}).then((setting) => {
      if (setting === false) {setting = {
        weight: 'Not set',
        height : 'Not set',
        heightUnit : '',
        weightUnit : ''
      }};
      setData(setting);
      setPrev(setting);
      document.getElementById(setting.heightUnit).checked = true;
      document.getElementById(setting.weightUnit).checked = true;
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
    setData(prev);
    document.getElementById(prev.heightUnit).checked = true;
    document.getElementById(prev.weightUnit).checked = true;
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
    setPrev(data);
    setMessage('Saved!');
  };
  return (
    <div className="HomePage-container">
      <form onSubmit={sendData} onReset = {handleReset}>
        <div className="category-container">
          <p>Select Height Unit</p>
          <form onChange={handleInputChange}>
            <input type="radio" id="cm" name="heightUnit" value="cm"/>
            <label for="html">cm</label>
            <input type="radio" id="ft" name="heightUnit" value="ft"/>
            <label for="ft">ft</label>
          </form>


          <div className="second-box">
            <p>Select Weight Unit</p>
            <form onChange={handleInputChange}>
              <input type="radio" id="kg" name="weightUnit" value="kg"/>
              <label for="kg">kg</label>
              <input type="radio" id="lbs" name="weightUnit" value="lbs"/>
              <label for="lbs">lbs</label>
            </form>
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