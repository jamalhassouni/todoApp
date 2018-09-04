import React, { Component } from "react";
import BrowserDetection from "react-browser-detection";
import  { removeSVG,completeSVG } from "../../../utils/icons";

const browserHandler = {
  chrome: () => <div className="cover-bar" />,
  firefox: () => <div className="cover-bar width-15" />
};

class Uncompleted extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.state = { ...props, dragging: undefined, idEdited: null };
  }

  render() {

    var list = this.props.todos;
    if (list != null) {
    list = list.map(
      function(data, index) {
        // eslint-disable-next-line
        const dragging = index == this.state.dragging ? "dragging" : "";
        // eslint-disable-next-line
        if (data.id === this.state.idEdited) {
          return (
            <input
              className="inputedit"
              ref="input"
              key={index}
              type="text"
              onKeyPress={this.handleSave.bind(this)}
              defaultValue={data.item}
              id={data.id}
            />
          );
        } else {
          return (
            <li
              className={dragging}
              data-value={data.item}
              onClick={this.handleEdit.bind(this)}
              draggable="true"
              ref="Item"
              data-id={data.id}
              data-index = {index}
              key={index}
              onDrop={this.Drop.bind(this)}
              onDragOver={this.dragOver.bind(this)}
              onDragLeave={this.dragLeave.bind(this)}
              onDragEnter={this.dragEnter.bind(this)}
              onDragEnd={this.dragEnd.bind(this)}
              onDragStart={this.dragStart.bind(this)}
            >
              {data.item}
              <div className="buttons">
                <button
                  className="remove"
                  onClick={this.handleDelete}
                  dangerouslySetInnerHTML={{ __html: removeSVG }}
                />
                <button
                  className="complete"
                  onClick={this.handleComplete}
                  dangerouslySetInnerHTML={{ __html: completeSVG }}
                />
              </div>
            </li>
          );
        }
      }.bind(this)
    );


   }
    return (
     <div className="col-md-6">
      <ul className="todo scroll-bar-wrap" id="todo">
        <div className="scroll-box">{list}</div>
        <BrowserDetection>{browserHandler}</BrowserDetection>
      </ul>
      </div>
    );
  }
  handleSave(e) {
    e = e || window.event;
    var charCode = e.keyCode || e.which;
    var idEdited = this.state.idEdited;
    if (charCode === 13) {
      if (idEdited !== -1) {
        this.props.onEdit(idEdited,this.refs.input.value);
      }
      this.setState({
        idEdited: null
      });
    }
  }
  handleEdit(e) {
    if (e.target === e.currentTarget) {
      let item = e.currentTarget;
      let id = item.dataset.id;
      this.setState({
        idEdited: id
      });
    } else {
      this.setState({
        idEdited: null
      });
    }
  }

  handleDelete(e) {
    let id = e.currentTarget.parentNode.parentNode.dataset.id;
    this.props.onDelete(id);
  }
  handleComplete(e) {
      let id = e.currentTarget.parentNode.parentNode.dataset.id;
      this.setState({
        idEdited: id
      });
      this.props.onComplete(id,2);
  }

  dragOver(e) {
    e.preventDefault();
    const items = this.state.todos;
    const key = e.currentTarget.dataset.index;
    const dragging = this.state.dragging;
    const from = isFinite(dragging) ? dragging : this.dragged;
    let to = Number(key);
    items.splice(to, 0, items.splice(from, 1)[0]);
    this.sort(items, to);
  }

  dragEnd() {
    // update state
    this.sort(this.state.todos, undefined);
  }

  dragEnter() {}

  dragLeave() {
    console.log("leave");
  }
  dragStart(e) {
    const key = e.currentTarget.dataset.index;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", null);
    this.dragged = Number(key);
  }
  Drop(e) {
    e.preventDefault();
    const items = this.props.todos;
    const key = e.currentTarget.dataset.index;
    const dragging = this.state.dragging;
    const from = isFinite(dragging) ? dragging : this.dragged;
    let to = Number(key);
    items.splice(to, 0, items.splice(from, 1)[0]);
    this.sort(items, to);
    let From = items[this.dragged].id,
    PosFrom = items[this.dragged].sort,
    To = items[key].id,
    PosTo = items[key].sort ;
    this.props.onSort(From,PosFrom,To,PosTo);
  }

  sort(list, dragging) {
    const state = this.state;
    state.todos = list;
    state.dragging = dragging;
    this.setState({ state });
  }


}

export default Uncompleted;
