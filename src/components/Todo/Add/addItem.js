import React from "react";
import "./addItem.css";
import  { addSVG } from "../../../utils/icons";

const AddItem = ({ onAdd }) => {
  return (
    <div className="app-header">
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
  );
};

export default AddItem;
