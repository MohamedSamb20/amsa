import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./HomePage.css";
import SettingBox from '../modules/SettingBox.js';

const Settings = (props) => {
  document.title = 'Settings';
  const [message, setMessage] = useState('');
  const [data, setData] = useState('');
  const [prev, setPrev] = useState('')
  useEffect(() => {
    get("/api/settings", {userId :props.userId}).then((setting) => {
      if (setting === false) {setting = {
        userId: props.userId,
        weight: '',
        height : '',
        heightUnit : 'Not set',
        weightUnit : 'Not set',
        height1: '',
        height2:'',
      }};
      setData(setting);
      setPrev(setting);
      document.getElementById(setting.heightUnit).checked = true;
      document.getElementById(setting.weightUnit).checked = true;
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'heightUnit') {setData((prevProps) => ({
      ...prevProps,
      [name]: value,
      height : '',
      height1 :'',
      height2: '',
    }));
  } else {setData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));}
  };

  const handleReset = (event) => {
    setData(prev);
    document.getElementById(prev.heightUnit).checked = true;
    document.getElementById(prev.weightUnit).checked = true;
    setMessage('Settings Reset!')
  };

  const sendData = (e) => {
    e.preventDefault();
    if (data.weight === '') {
      alert('Specify your weight');
      return ('')};
    if (data.heightUnit === 'Not set'){
      alert('Specify your height');
      return('');
    };
    if (data.heightUnit==='cm'){
      if (data.height === ''){
      alert('Specify your height');
      return('');}
    } else {if (data.height1 === '' || data.height2 ==='') {
      alert('Specify your height');
    return('');}}
    const body = data;
    post("/api/settings", body).then((res) => console.log(res));
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

          <SettingBox name ='height' unit={data.heightUnit} data={data} handleInputChange={handleInputChange}/>
          
          <div className="second-box">
            <p>Select Weight Unit</p>
            <form onChange={handleInputChange}>
              <input type="radio" id="kg" name="weightUnit" value="kg"/>
              <label for="kg">kg</label>
              <input type="radio" id="lbs" name="weightUnit" value="lbs"/>
              <label for="lbs">lbs</label>
            </form>
          </div>

          
          <SettingBox name='weight' unit={data.weightUnit} data={data} handleInputChange={handleInputChange}/>
          <button type="submit">Save</button>
          <button type = 'reset'> Reset </button>
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
};

export default Settings;