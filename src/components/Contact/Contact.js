import React from "react";
import { MAP_API_KEY } from '../../utils/apiKeys';
import Map from "../Map/Map";
import "./Contact.css";
 const Contact = () => {
    return(
        <section id="contact" className="section">
   <div className="container">
       <div className="section-title">
           <h4 className="text-uppercase text-center"><img src="http://trimatrixlab.com/store/flatrica/images/icons/envelope.png" alt="demo"/>Contact</h4>
       </div>
       <div className="row">
           <div id="contact-card" className="col-md-5 col-sm-12 col-xs-12">
               <div className="card">
                   <div className="card-content">
                       <form id="contact-form" name="c-form">
                           <div className="input-field">
                               <input id="first_name" type="text" className="validate" name="first_name" required/>
                               <label htmlFor="first_name">Name</label>
                           </div>
                           <div className="input-field">
                               <input id="sub" type="text" className="validate" name="sub" required/>
                               <label htmlFor="sub">Subject</label>
                           </div>
                           <div className="input-field">
                               <input id="email" type="email" className="validate" name="email" required/>
                               <label htmlFor="email">Email</label>
                           </div>
                           <div className="input-field">
                               <textarea id="textarea1" className="materialize-textarea" name="message"
                                         required></textarea>
                               <label htmlFor="textarea1">Message</label>
                           </div>
                           <div className="contact-send">
                               <button id="submit" name="contactSubmit" type="submit" value="Submit"
                                       className="btn waves-effect">Send
                               </button>
                           </div>
                       </form>
                   </div>
                   <div id="form-loader" className="progress is-hidden">
                       <div className="indeterminate"></div>
                   </div>
               </div>
           </div>

           <div className="col-md-7 col-sm-12 col-xs-12">
               <div id="map-card" className="card">
                   <Map isMarkerShown
                     googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&v=3`}
                     containerElement={<div style={{ height: `400px` }} />}
                     mapElement={<div style={{ height: `100%` }} />}
                     loadingElement={"hello"}
                      />
               </div>
           </div>

       </div>
   </div>
</section>
    );
 }


export default Contact;