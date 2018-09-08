import React from "react";
import {Link } from 'react-router-dom';
import  { addSVG } from "../../../utils/icons";

const AddItem = ({ onAdd }) => {
  return (
    <div className="app-top">
    <a href="/" id="logo">Todo App</a>
    <div id="navbar" className="text-center">
          <ul id="menu">
            <li><Link to={'/'}><span>Home</span></Link></li>
            <li><a href="/"><span>Add</span></a></li>
            <li><Link to={'/about'}><span>About me</span></Link></li>
            <li><a href="/"><span>Contact</span></a></li>
          </ul>
          </div>

     <div className="add-from">
    <form id="add-todo" onSubmit={e => onAdd(e)}>
        <input
          type="text"
          name="addInput"
          autoComplete="off"
          required
          placeholder="Enter an activity.."
        />
        <button id="add" dangerouslySetInnerHTML={{ __html: addSVG }} />
      </form>
    </div>
    </div>



  );
};

export default AddItem;
