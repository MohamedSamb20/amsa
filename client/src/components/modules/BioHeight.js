import React from "react";
import "../../utilities.css";



const BioHeight = (props) =>  {
  if (props.unit ==='Not set') {return(<p>Height: Not set</p>)};
  if (props.unit === 'cm') {return (<p>Height: {props.height} {props.unit}</p>)}; 
  if (props.unit ==='ft') {
    return <p>Height: {props.height1} ft {props.height2}</p>
  };
  return(<p>Height: Loading...</p>)
};

export default BioHeight;