import React, { Component } from "react";
import BrowserDetection from "react-browser-detection";
import { removeSVG, completeSVG, closeSVG } from "../../../utils/icons";

const browserHandler = {
  chrome: () => <div className="cover-bar" />,
  firefox: () => <div className="cover-bar width-15" />
};

class Uncompleted extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.close = this.close.bind(this);
    this.state = { ...props, dragging: undefined, idEdited: null };
  }

  render() {
    var list = this.props.todos;
    if (list != null) {
      list = list.map(
        function(data, index) {
          // eslint-disable-next-line
          const dragging = index == this.state.dragging ? "dragging" : "";
          const classes = `${dragging} item`;
          // eslint-disable-next-line
          if (data.id === this.state.idEdited) {
            return (
              <li key={index} className="editable">
                <input
                  className="inputedit"
                  ref="input"
                  type="text"
                  onKeyPress={this.handleSave.bind(this)}
                  defaultValue={data.item}
                  id={data.id}
                />
                <div className="buttons">
                  <button
                    className="close"
                    onClick={this.close}
                    dangerouslySetInnerHTML={{ __html: closeSVG }}
                  />
                </div>
              </li>
            );
          } else {
            return (
              <li
                className={classes}
                data-value={data.item}
                draggable="true"
                data-id={data.id}
                data-index={index}
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
        <ul
          className="todo scroll-bar-wrap"
          id="todo"
          ref={node => (this.node = node)}
        >
          <div className="scroll-box">{list}</div>
          <BrowserDetection>{browserHandler}</BrowserDetection>
        </ul>
      </div>
    );
  }
  componentDidMount() {
    document.addEventListener("click", this.handleEdit, false);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleEdit, false);
  }
  close(e) {
    this.setState({
      idEdited: null
    });
    console.log("cancel");
  }
  handleSave(e) {
    e = e || window.event;
    var charCode = e.keyCode || e.which;
    var idEdited = this.state.idEdited;
    if (charCode === 13) {
      if (idEdited !== -1) {
        this.props.onEdit(idEdited, this.refs.input.value);
      }
      this.setState({
        idEdited: null
      });
    }
  }
  handleClickOutside() {
    console.log("outside!!");
    this.setState({
      idEdited: null
    });
  }
  handleEdit(e) {
    if (this.node.contains(e.target)) {
      // this click is inside
      if (e.target.className !== "inputedit") {
        console.log(e.target.className);
        let item = e.target;
        let id = item.dataset.id;
        this.setState({
          idEdited: id
        });
        if (this.state.idEdited) {
          document.querySelector(".inputedit").focus();
        }
        return;
      }
    } else {
      // this click is outside
      this.handleClickOutside();
    }

    /* if (e.target === e.currentTarget) {
      let item = e.currentTarget;
      let id = item.dataset.id;
      this.setState({
        idEdited: id
      });
    } else {
      this.setState({
        idEdited: null
      });
    }*/
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
    this.props.onComplete(id, 2);
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
      PosTo = items[key].sort;
    this.props.onSort(From, PosFrom, To, PosTo);
  }

  sort(list, dragging) {
    const state = this.state;
    state.todos = list;
    state.dragging = dragging;
    this.setState({ state });
  }
}

export default Uncompleted;
