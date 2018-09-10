import React from "react";
import Mapy from "../Map/Map";
import envelope from "../../utils/img/envelope.png";
import "./Contact.css";
const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-title">
          <h4 className="text-uppercase text-center">
            <img src={envelope} alt="demo" />
            Contact
          </h4>
        </div>
        <div className="row">
          <div id="contact-card" className="col-md-5 col-sm-12 col-xs-12">
            <div className="card">
              <div className="card-content">
                <form id="contact-form" name="c-form">
                  <div className="input-field">
                    <input
                      id="first_name"
                      type="text"
                      className="validate"
                      name="first_name"
                      required
                    />
                    <label htmlFor="first_name">Name</label>
                  </div>
                  <div className="input-field">
                    <input
                      id="sub"
                      type="text"
                      className="validate"
                      name="sub"
                      required
                    />
                    <label htmlFor="sub">Subject</label>
                  </div>
                  <div className="input-field">
                    <input
                      id="email"
                      type="email"
                      className="validate"
                      name="email"
                      required
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field">
                    <textarea
                      id="textarea1"
                      className="materialize-textarea"
                      name="message"
                      required
                    />
                    <label htmlFor="textarea1">Message</label>
                  </div>
                  <div className="contact-send">
                    <button
                      id="submit"
                      name="contactSubmit"
                      type="submit"
                      value="Submit"
                      className="btn waves-effect"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
              <div id="form-loader" className="progress is-hidden">
                <div className="indeterminate" />
              </div>
            </div>
          </div>

          <div className="col-md-7 col-sm-12 col-xs-12">
            <div id="map-card" className="card">
              <Mapy />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
