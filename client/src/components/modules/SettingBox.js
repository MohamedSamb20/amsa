import React from "react";
import "../../utilities.css";
import "./SettingBox.css";

const SettingBox = (props) => {
    if (props.unit === 'Not set') { return(<></>)};
    if (props.name === 'weight') {return(
        <div>
            <p>Set Weight</p>
            <div className="boxContainer">
                <input
                type="number"
                name="weight"
                min="0"
                value={props.data.weight}
                onChange={props.handleInputChange}
                placeholder="Enter your weight"
                />
                <p>{props.unit}</p>
            </div>
          </div>
    )} else {
        if (props.unit === 'cm') {
            return (<div>
                <p>Set Height</p>
                <div className="boxContainer">
                    <input
                    type="number"
                    name="height"
                    min = "0"
                    value={props.data.height}
                    onChange={props.handleInputChange}
                    placeholder='Enter your height'
                    />
                    <p>cm</p>
                </div>
              </div>)
        } else {
            return(
                <div>
                    <p>Set Height</p>
                    <div className="boxContainer">
                    <input
                        type="number"
                        name="height1"
                        min = "0"
                        value={props.data.height1}
                        onChange={props.handleInputChange}
                        placeholder='Enter your height'
                        />
                        <p>ft</p>
                        <input
                            type="number"
                            name="height2"
                            min = "0"
                            max ="11"
                            value={props.data.height2}
                            onChange={props.handleInputChange}
                            placeholder='Enter your height'
                            />
                    </div>
              </div>  
            )
        }
    }
}

export default SettingBox;