import React, { Component } from "react";
import {Link } from 'react-router-dom';
class About  extends Component{
  render(){
     return(
         <div>
        <nav className="cl-effect">

        <Link to={'/'}>Home</Link>
         </nav>
        <h2>All about me</h2>
        </div>
     );

  }

}
export default About;