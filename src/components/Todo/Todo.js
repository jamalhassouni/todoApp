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
      completed: []
    };
  } //constructor

  componentDidMount() {
    TodosAPI.fetchAll().then(data => {
      this.setState({
        data: data.todos,
        completed: data.completed
      });
    });
  }
  //custom functions
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
        <div className="row">
          {/* Uncompleted tasks  */}
          <div className="col-md-6">
            <Uncompleted
              todos={this.state.data}
              onDelete={this.onDelete}
              onEdit={this.onEdit}
              onSort={this.onSort}
              onComplete={this.onComplete}
            />
          </div>
          {/* Completed tasks */}
          <div className="col-md-6">
            <Completed
              todos={this.state.completed}
              onDelete={this.onDelete}
              onComplete={this.onComplete}
            />
          </div>
        </div>
      </div>
    );
  } // render
}

export default Todo;
