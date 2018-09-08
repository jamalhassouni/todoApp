import React, { Component } from "react";
import {Link } from 'react-router-dom';
import Card from './Card';
import HeaderComponent from './Header';
//import "../../utils/styles/materialize.css";
import "./About.css";
class About  extends Component{
  render(){
     return(
         <div>
        <HeaderComponent/>
         <Card/>
         <div id="about" className="section">
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div id="about-card" className="card">
                    <div className="card-content">
                        <p>
                            Hello! I’m Jamal Hassouni. Senior Web Developer with over 5 years of experience
                            specializing in front end development. Experienced with all stages of the
                            development cycle for dynamic web projects.Having an in-depth knowledge
                            including advanced HTML5, CSS, CSS3, SASS, PugJS, JSON, XML,PHP, JavaScript,
                            JQuery, React JS.
                        </p>
                    </div>

                    <div id="about-btn" className="card-action">
                        <div className="about-btn">
                            <Link to={'/'} className="btn waves-effect" >Home</Link>
                            <Link to={'/contact'} className="btn waves-effect">Contact Me</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </div>
     );

  }

}
export default About;