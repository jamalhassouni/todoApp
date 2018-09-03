import React, { Component } from "react";
import { Router, Route, Link } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import "./App.css";
import "./dnd.css";
// Module requires
import AddItem from "./addItem";
import About from "./about";
import TodoItem from "./TodoItem";
import CompletedItem from "./completedItem";

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
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSort = this.onSort.bind(this);
    this.state = {
      data: [],
      completed: []
    };
  } //constructor

  render() {
    return (
      <div id="todo-list" className="container">
        <AddItem onAdd={this.onAdd} ref="add" />
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
  //custom functions
  onDelete(id) {
    fetch(`http://localhost/ReactTodolist/todo-app/src/server.php`, {
      method: "POST",
      headers: new Headers(),
      body: JSON.stringify({ delete: id }) // body data type must match "Content-Type" header
    })
      .then(response => response.json()) // parses response to JSON
      .then((
        data // update state
      ) =>
        this.setState({
          data: data.todos,
          completed: data.completed
        })
      );
  }
  onAdd(item) {
    fetch(`http://localhost/ReactTodolist/todo-app/src/server.php`, {
      method: "POST",
      headers: new Headers(),
      body: JSON.stringify({ todo: item }) // body data type must match "Content-Type" header
    })
      .then(response => response.json()) // parses response to JSON
      .then((
        data // update state
      ) =>
        this.setState({
          data: data.todos
        })
      );
  }
  onComplete(id, type) {
    fetch(`http://localhost/ReactTodolist/todo-app/src/complete.php`, {
      method: "POST",
      headers: new Headers(),
      body: JSON.stringify({ id: id, type: type }) // body data type must match "Content-Type" header
    })
      .then(response => response.json()) // parses response to JSON
      .then((data ) => // update state
        this.setState({
          data: data.todos,
          completed: data.completed
        })
      );
  }

  onEdit(id, item) {
    fetch(`http://localhost/ReactTodolist/todo-app/src/server.php`, {
      method: "POST",
      headers: new Headers(),
      body: JSON.stringify({ edit: id, item: item }) // body data type must match "Content-Type" header
    })
  .then(response => response.json()) // parses response to JSON
  .then(data =>
    this.setState({
      data: data.todos,
      completed: data.completed
    })
  )
  }

  onSort(From,PosFrom,To,PosTo){
    fetch(`http://localhost/ReactTodolist/todo-app/src/sort.php`, {
      method: "POST",
      headers: new Headers(),
      body: JSON.stringify({ from:From, posFrom: PosFrom, to:To,posTo:PosTo }) // body data type must match "Content-Type" header
    })
  .then(response => response.json()) // parses response to JSON
  .then(data =>
    this.setState({
      data: data.todos,
      completed: data.completed
    })
  )
  }

  fetchAll() {
    fetch(`http://localhost/ReactTodolist/todo-app/src/server.php`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the todos state
      .then(data =>
        this.setState({
          data: data.todos,
          completed: data.completed
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => console.error(error));
  }

  // lifcylce functions
  /* componentWillMount(){
          console.log('componentWillMount');
        }
        componentDidMount(){
          console.log('componentDidMount');
          // any grabbing of external data
        }
        componentWillUpdate(){
         console.log('componentWillUpdate');
          console.log(localStorage.getItem("todos"));

        }*/

  componentDidMount() {
    this.fetchAll();
  }
}

export default App;
