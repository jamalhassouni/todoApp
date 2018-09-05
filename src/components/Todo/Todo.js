import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddItem from "./Add/addItem";
import Uncompleted from "./Uncompleted/Uncompleted";
import Completed from "./Completed/Completed";
import * as TodosAPI from "../../utils/TodosAPI";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      completed: [],
      dragging: undefined,
      idEdited: null
    };
  } //constructor

  componentDidMount() {
    document.addEventListener("click", this.handleEdit, false);
    TodosAPI.fetchAll().then(data => {
      this.setState({
        data: data.todos,
        completed: data.completed
      });
    });
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleEdit, false);
  }
  //custom functions
  onClose = () => {
    this.setState({
      idEdited: null
    });
  };
  onSave = e => {
    e = e || window.event;
    var charCode = e.keyCode || e.which;
    var idEdited = this.state.idEdited;
    if (charCode === 13) {
      if (idEdited !== -1) {
        this.onEdit(idEdited, e.target.value);
      }
      this.setState({
        idEdited: null
      });
    }
  };
  handleClickOutside = () => {
    this.setState({
      idEdited: null
    });
  };
  handleEdit = e => {
    if (this.node.contains(e.target)) {
      // this click is inside
      if (e.target.className !== "inputedit") {
        let id = e.target.dataset.id;
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
  };
  onDragOver = e => {
    e.preventDefault();
    const items = this.state.data;
    let key = e.currentTarget.dataset.index;
    let dragging = this.state.dragging;
    let dragedFrom = isFinite(dragging) ? dragging : this.dragged;
    let dragedTo = Number(key);
    items.splice(dragedTo, 0, items.splice(dragedFrom, 1)[0]);
    this.setState({
      dragging: dragedTo
    });
    // this.sort(items, dragedTo);
  };
  onDragEnd = () => {
    // update state
    this.setState({
      dragging: undefined
    });
  };
  onDragStart = e => {
    let key = e.currentTarget.dataset.index;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", null);
    this.dragged = Number(key);
  };
  onDragEnter = e => {
    let to = Number(e.currentTarget.dataset.index);
    this.setState({
      dragging: to
    });
  };

  onDragLeave = () => {};

  Drop = e => {
    e.preventDefault();
    const items = this.state.data;
    let dragging = this.state.dragging;
    let key = e.currentTarget.dataset.index;
    let dragedFrom = isFinite(dragging) ? dragging : this.dragged;
    let dragedTo = Number(key);
    items.splice(dragedTo, 0, items.splice(dragedFrom, 1)[0]);
    let FromId = items[this.dragged].id,
      PosFrom = items[dragedFrom].sort,
      ToId = items[dragedFrom].id,
      PosTo = items[this.dragged].sort;
    this.setState({
      dragging: dragedTo
    });
    this.onSort(FromId, PosFrom, ToId, PosTo);
  };

  onDelete = id => {
    let url = `http://localhost/ReactTodolist/todo-app/src/server.php`;
    TodosAPI.remove(url, { delete: id }).then(data => {
      this.setState({
        data: data.todos,
        completed: data.completed
      });
    });
  };
  onAdd = e => {
    e.preventDefault();
    let pos = Number(this.state.data.slice(-1)[0].sort) + 1;
    let item = e.target.addInput.value;
    if (item.trim()) {
      e.target.addInput.value = "";
      let url = `http://localhost/ReactTodolist/todo-app/src/server.php`;
      TodosAPI.create(url, { todo: item, pos: pos }).then(data => {
        this.setState({
          data: data.todos,
          completed: data.completed
        });
      });
    }
  };
  onComplete = (id, type) => {
    let url = `http://localhost/ReactTodolist/todo-app/src/complete.php`;
    TodosAPI.update(url, { id: id, type: type }).then(data => {
      this.setState({
        data: data.todos,
        completed: data.completed
      });
    });
  };

  onEdit = (id, item) => {
    let url = `http://localhost/ReactTodolist/todo-app/src/server.php`;
    TodosAPI.update(url, { edit: id, item: item }).then(data => {
      this.setState({
        data: data.todos,
        completed: data.completed
      });
    });
  };

  onSort = (From, PosFrom, To, PosTo) => {
    let url = `http://localhost/ReactTodolist/todo-app/src/sort.php`;
    TodosAPI.Sort(url, {
      from: From,
      posFrom: PosFrom,
      to: To,
      posTo: PosTo
    }).then(data => {
      this.setState({
        data: data.todos,
        completed: data.completed
      });
    });
  };

  render() {
    return (
      <div id="todo-list" className="container">
        <AddItem onAdd={this.onAdd} />
        <nav className="cl-effect">
          <Link to={"/about"}>About</Link>
        </nav>
        <p>The busiest people have the most leisure...</p>
        <div className="row" ref={node => (this.node = node)}>
          {/* Uncompleted tasks  */}
          <Uncompleted
            todos={this.state.data}
            ItemDragging={this.state.dragging}
            idEdited={this.state.idEdited}
            onDelete={this.onDelete}
            onEdit={this.onEdit}
            onSave={this.onSave}
            onSort={this.onSort}
            onClose={this.onClose}
            onComplete={this.onComplete}
            onDrop={this.Drop}
            onDragLeave={this.onDragLeave}
            onDragEnter={this.onDragEnter}
            onDragOver={this.onDragOver}
            onDragEnd={this.onDragEnd}
            onDragStart={this.onDragStart}
          />

          {/* Completed tasks */}
          <Completed
            todos={this.state.completed}
            onDelete={this.onDelete}
            onComplete={this.onComplete}
          />
        </div>
      </div>
    );
  } // render
}

export default Todo;
