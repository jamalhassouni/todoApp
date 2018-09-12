import React, { Component } from "react";
import AddItem from "./Add/addItem";
import Uncompleted from "./Uncompleted/Uncompleted";
import Completed from "./Completed/Completed";
import * as TodosAPI from "../../utils/TodosAPI";
import "./Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uncompleted: [],
      completed: [],
      draggingA: undefined,
      draggingB: undefined,
      idEdited: null
    };
  } //constructor

  componentDidMount() {
    document.addEventListener("click", this.handleEdit, false);
    this.getData();
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
  onDragOver = (e, type) => {
    e.preventDefault();
    let items, dragging;
    if (type === 1) {
      items = this.state.uncompleted;
      dragging = this.state.draggingA;
    } else if (type === 2) {
      items = this.state.completed;
      dragging = this.state.draggingB;
    }
    let key = e.currentTarget.dataset.index;
    let dragedFrom = isFinite(dragging) ? dragging : this.dragged;
    let dragedTo = Number(key);
    items.splice(dragedTo, 0, items.splice(dragedFrom, 1)[0]);
    if (type === 1) {
      this.setState({
        draggingA: dragedTo
      });
    } else if (type === 2) {
      this.setState({
        draggingB: dragedTo
      });
    }
  };
  onDragEnd = type => {
    // update state
    if (type === 1) {
      this.setState({
        draggingA: undefined
      });
    } else if (type === 2) {
      this.setState({
        draggingB: undefined
      });
    }
  };
  onDragStart = e => {
    let key = e.currentTarget.dataset.index;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", null);
    this.dragged = Number(key);
  };
  onDragEnter = (e, type) => {
    let to = Number(e.currentTarget.dataset.index);
    if (type === 1) {
      this.setState({
        draggingA: to
      });
    } else if (type === 2) {
      this.setState({
        draggingB: to
      });
    }
  };

  onDragLeave = () => {};

  Drop = (e, type) => {
    e.preventDefault();
    let items, dragging;
    if (type === 1) {
      items = this.state.uncompleted;
      dragging = this.state.draggingA;
    } else if (type === 2) {
      items = this.state.completed;
      dragging = this.state.draggingB;
    }
    let key = e.currentTarget.dataset.index;
    let dragedFrom = isFinite(dragging) ? dragging : this.dragged;
    let dragedTo = Number(key);
    items.splice(dragedTo, 0, items.splice(dragedFrom, 1)[0]);
    let FromId = items[this.dragged].id,
      PosFrom = items[dragedFrom].sort,
      ToId = items[dragedFrom].id,
      PosTo = items[this.dragged].sort;
    if (type === 1) {
      this.setState({
        draggingA: dragedTo
      });
    } else if (type === 2) {
      this.setState({
        draggingB: dragedTo
      });
    }

    this.onSort(FromId, PosFrom, ToId, PosTo);
  };

  onDelete = (id, type, sort) => {
    TodosAPI.remove({ id: id, type: type, sort: sort }).then(data => {
      if (data.status === 200) {
        this.getData();
      }
    });
  };
  onAdd = e => {
    e.preventDefault();
    let item = e.target.addInput.value;
    if (item.trim()) {
      e.target.addInput.value = "";
      TodosAPI.create({ item: item }).then(data => {
        if (data.status === 200) {
          this.getData();
        }
      });
    }
  };
  onComplete = (id, type, sort) => {
    TodosAPI.update({ id: id, type: type, sort: sort }).then(data => {
      if (data.status === 200) {
        this.getData();
      } else {
        console.log(data.message);
      }
    });
  };

  onEdit = (id, item) => {
    TodosAPI.update({ id: id, item: item }).then(data => {
      if (data.status === 200) {
        this.getData();
      } else {
        console.log(data.message);
      }
    });
  };

  onSort = (From, PosFrom, To, PosTo) => {
    TodosAPI.update({
      from: From,
      posFrom: PosFrom,
      to: To,
      posTo: PosTo
    }).then(data => {
      if (data.status === 200) {
        this.getData();
      } else {
        console.log(data.message);
      }
    });
  };

  getData = () => {
    TodosAPI.fetchAll().then(data => {
      this.setState({
        uncompleted: data.uncompleted,
        completed: data.completed
      });
    });
  };
  render() {
    return (
      <div id="todo-list" className="container">
        <AddItem onAdd={this.onAdd} />
        <div className="row" ref={node => (this.node = node)}>
          {/* Uncompleted tasks  */}
          <Uncompleted
            todos={this.state.uncompleted}
            ItemDragging={this.state.draggingA}
            idEdited={this.state.idEdited}
            onDelete={this.onDelete}
            onSave={this.onSave}
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
            ItemDragging={this.state.draggingB}
            onDelete={this.onDelete}
            idEdited={this.state.idEdited}
            onSave={this.onSave}
            onClose={this.onClose}
            onComplete={this.onComplete}
            onDrop={this.Drop}
            onDragLeave={this.onDragLeave}
            onDragEnter={this.onDragEnter}
            onDragOver={this.onDragOver}
            onDragEnd={this.onDragEnd}
            onDragStart={this.onDragStart}
          />
        </div>
      </div>
    );
  } // render
}

export default Todo;
