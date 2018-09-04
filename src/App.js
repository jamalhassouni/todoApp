import React, { Component } from "react";
import { Router, Route, Link } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import "./App.css";
// Module requires
import AddItem from "./addItem";
import About from "./about";
import TodoItem from "./TodoItem";
import CompletedItem from "./completedItem";
import * as TodosAPI from "./utils/TodosAPI";
const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path={"/"} component={TodoComponent} />
          <Route path={"/about"} component={About} />
        </div>
      </Router>
    );
  }
}

// Create component
class TodoComponent extends Component {
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
            <TodoItem
              todos={this.state.data}
              onDelete={this.onDelete}
              onEdit={this.onEdit}
              onSort={this.onSort}
              onComplete={this.onComplete}
            />
          </div>
          {/* Completed tasks */}
          <div className="col-md-6">
            <CompletedItem
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

export default App;
