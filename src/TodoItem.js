import React, { Component } from "react";
import BrowserDetection from "react-browser-detection";
const browserHandler = {
  chrome: () => <div className="cover-bar" />,
  firefox: () => <div className="cover-bar width-15" />
};
var cachedTodos;
var Todos = {
  data: [
    { id: 1, item: "php" },
    { id: 2, item: "javascript" },
    { id: 3, item: "react" },
    { id: 4, item: "vue" },
  ]
};
class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.state = { ...props, dragging: undefined, idEdited: null };
  }

  render() {
    localStorage.getItem("todos") == null
      ? (cachedTodos = [])
      : (cachedTodos = JSON.parse(localStorage.getItem("todos")));
    var removeSVG =
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
    var completeSVG =
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
    var list = this.props.todos;
    list = list.map(
      function(data, index) {
        // eslint-disable-next-line
        const dragging = index == this.state.dragging ? "dragging" : "";
        // eslint-disable-next-line
        if (data.id == this.state.idEdited) {
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

    return (
      <ul className="todo scroll-bar-wrap" id="todo">
        <div className="scroll-box">{list}</div>
        <BrowserDetection>{browserHandler}</BrowserDetection>
      </ul>
    );
  }
  handleSave(e) {
    e = e || window.event;
    var charCode = e.keyCode || e.which;
    var idEdited = this.state.idEdited;
    if (charCode === 13) {
      console.log("id", this.state.idEdited);
      var items = Todos.data;
      if (idEdited !== -1) {
        items[idEdited] = this.refs.input.value;
        console.log("id updated", this.state.idEdited);
      }
      this.setState({
        todos: items,
        idEdited: null
      });
      localStorage.setItem("todos", JSON.stringify(items));
    }
  }
  handleEdit(e) {
    console.log("this parent", e.currentTarget);
    console.log("this children", e.target);
    if (e.target === e.currentTarget) {
      console.log("idedited", this.state.idEdited);
      let item = e.currentTarget;
      let id = item.dataset.id;
      this.setState({
        idEdited: id
      });
      console.log("id", id, "cureent id", this.state.idEdited);
    } else {
      this.setState({
        idEdited: null
      });
    }
  }

  handleDelete(e) {
    let id = e.currentTarget.parentNode.parentNode.dataset.id;
    let item = Todos.data[id];
    this.props.onDelete(item);
  }
  handleComplete(e) {
    if (e.target === e.currentTarget) {

      console.log(e.currentTarget);
      console.log(e.target);
      let id = e.currentTarget.parentNode.parentNode.dataset.id;
      let key = e.currentTarget.parentNode.parentNode.dataset.index;
      console.log("key",key);
      this.setState({
        idEdited: id
      });
      let item = this.props.todos[key].item;
      console.log(item,id);
      this.props.onComplete(id);
    }
  }

  dragOver(e) {
    e.preventDefault();
    const items = cachedTodos;
    const over = e.currentTarget;
    const dragging = this.state.dragging;
    const from = isFinite(dragging) ? dragging : this.dragged;
    let to = Number(over.dataset.id);
    items.splice(to, 0, items.splice(from, 1)[0]);
    console.log("over to ", to);
    this.sort(items, to);
  }

  dragEnd(e) {
    // update state
    this.sort(this.state.todos, undefined);
  }

  dragEnter(e) {}

  dragLeave(e) {
    console.log("leave");
  }
  dragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", null);
    this.dragged = Number(e.currentTarget.dataset.id);
    console.log("id", this.dragged);
  }
  Drop(e) {
    e.preventDefault();
    const items = cachedTodos;
    const over = e.currentTarget;
    const dragging = this.state.dragging;
    const from = isFinite(dragging) ? dragging : this.dragged;
    let to = Number(over.dataset.id);
    items.splice(to, 0, items.splice(from, 1)[0]);
    this.sort(items, to);
    console.log("data droped", items);
    console.log("droped to", e.currentTarget.dataset.id);
    console.log("droped from ", this.dragged);
    console.log("droped");
  }

  sort(list, dragging) {
    const state = this.state;
    state.todos = list;
    state.dragging = dragging;
    this.setState({ state });
    // update localStorage
    localStorage.setItem("todos", JSON.stringify(list));
  }

  componentDidMount() {}
  componentWillUpdate() {}
}

export default TodoItem;
