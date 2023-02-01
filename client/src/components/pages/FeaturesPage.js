import React from "react";
import { Redirect } from "@reach/router";

import "../../utilities.css";
import "./FeaturesPage.css";
import logo from "../../public/logo.png";
import Cards from "./Cards.js";
const FeaturesPage = (props) => {
    document.title = 'Features'
    return (
    <div className="FeaturesPage-container">
           
           <h1 style={{fontSize: '80px', position: 'relative', left: '800 px'}}>Features</h1>
            

            <div className="columns" style={{margin:'60px'}}>
           
                <div className='column'>
                    <Cards 
                    name={'Track'}
                    description={'Set routine and log completed workouts'}
                    
                    />

                </div>
                <div className='column'>

                    <Cards 
                    name={'Analyze'}
                    description={'Visualize and stay on top for your goals'}
                    
                    />

                </div>
                <div className='column'>
                <Cards 
                    name={'Motivate'}
                    description={'Keep up a streak and compete with friends'}
                    
                    />

                </div>
            

            </div>
            

        
        </div>
        
    );
}

export default FeaturesPage;