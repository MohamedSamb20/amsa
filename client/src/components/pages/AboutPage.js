import React from "react";
import { Redirect } from "@reach/router";

import "../../utilities.css";
import "./AboutPage.css";

const AboutPage = (props) => {
    document.title = 'About'
    return (<div className="AboutPage-container">
            <h4 style={{fontSize: '80px', position: 'relative', left: '800 px'}}>Why amsa</h4>
            <br></br>
            <div className='first-paragraph'>Working out is an experience that requires consistency, and for many people, that consistency 
                comes from our peers. Working out with friends provides us with accountability to complete our 
                routines and motivates us to maximize our workouts. Life is unpredictable though, and being unable 
                to fit in some workouts with your normal gym buddy often means losing the motivation to stay consistent 
                to your workout routine
                
                </div>
   
            <div className='second-paragraph'>AMSA is a web application that allows users to track their workouts and progress. What makes AMSA 
                unique is its social features. Users are able to see their friends streaks and daily workouts. If a user is 
                looking for someone to workout with, they can choose from a list of friends who are also planning on working 
                out that day and set up a group workout session</div>
           
        </div>
    );
}

export default AboutPage;