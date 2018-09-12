import React from "react";
import PropTypes from 'prop-types';
import {Link } from 'react-router-dom';
import  { addSVG } from "../../../utils/icons";

const AddItem = ({ onAdd }) => {
  return (
    <div className="app-top">
      <Link  to={'/'} id="logo">Todo App</Link>
    <div id="navbar" className="text-center">
          <ul id="menu">
            <li><Link to={'/'}><span>Home</span></Link></li>
            <li><Link to={'/about'}><span>About me</span></Link></li>
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
AddItem.propTypes = {
  onAdd: PropTypes.func
};
export default AddItem;
