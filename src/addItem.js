import React, { Component } from "react";
import "./addItem.css";
class AddItem extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    var addSVG =
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve"><g><path class="fill" d="M16,8c0,0.5-0.5,1-1,1H9v6c0,0.5-0.5,1-1,1s-1-0.5-1-1V9H1C0.5,9,0,8.5,0,8s0.5-1,1-1h6V1c0-0.5,0.5-1,1-1s1,0.5,1,1v6h6C15.5,7,16,7.5,16,8z"/></g></svg>';
    return (
      <div className="app-header">
        <form id="add-todo" onSubmit={this.handleSubmit}>
          <input
            type="text"
            required
            ref="newItem"
            placeholder="Enter an activity.."
          />
          <button id="add" dangerouslySetInnerHTML={{ __html: addSVG }} />
        </form>
      </div>
    );
  }
  // custom functions
  handleSubmit(e) {
    e.preventDefault();
    if (this.refs.newItem.value.trim()) {
      this.props.onAdd(this.refs.newItem.value);
      this.refs.newItem.value = "";
    }
  }
}

export default AddItem;
