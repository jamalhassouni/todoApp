import React, { Component } from "react";
import { Router, Route, Link } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import "./App.css";
import "./dnd.css";
// Module requires
import AddItem from "./addItem";
import About from "./about";
//import TodoItem   from "./todoItem";
import List from "./dnd";
import CompletedItem from "./completedItem";
import BrowserDetection from "react-browser-detection";
const browserHandler = {
  chrome: () => <div className="cover-bar" />,
  firefox: () => <div className="cover-bar width-15" />
};
var cachedTodos, cachedCompleted;
localStorage.getItem("todos") == null
  ? (cachedTodos = [])
  : (cachedTodos = JSON.parse(localStorage.getItem("todos")));
localStorage.getItem("completed") == null || undefined
  ? (cachedCompleted = [])
  : (cachedCompleted = JSON.parse(localStorage.getItem("completed")));
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
    this.onDeleteCompleted = this.onDeleteCompleted.bind(this);
    this.onReAdded = this.onReAdded.bind(this);
    this.state = {
      todos: cachedTodos,
      completed: cachedCompleted
    };
  } //constructor

  render() {
    /* var todos = this.state.todos;
    todos = todos.map(function(item, index) {
      return <TodoItem item={item} key={index} onDelete={this.onDelete} onComplete={this.onComplete} />;
    }.bind(this));*/
    var completed = this.state.completed;
    completed = completed.map(
      function(item, index) {
        return (
          <CompletedItem
            item={item}
            key={index}
            onDelete={this.onDeleteCompleted}
            onReAdded={this.onReAdded}
          />
        );
      }.bind(this)
    );

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
            <List
              todos={cachedTodos}
              onDelete={this.onDelete}
              onComplete={this.onComplete}
            />
          </div>
          {/* Completed tasks */}
          <div className="col-md-6">
            <ul className="todo scroll-bar-wrap" id="completed">
              <div className="scroll-box">{completed}</div>
              <BrowserDetection>{browserHandler}</BrowserDetection>
            </ul>
          </div>
        </div>
      </div>
    );
  } // render
  //custom functions
  onDelete(item) {
    var updatedTodos = this.state.todos.filter(function(val, index) {
      return item !== val;
    });
    this.setState({
      todos: updatedTodos
    });
    // update localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  onAdd(item) {
    var updatedTodos = this.state.todos;
    updatedTodos.unshift(item);
    this.setState({
      todos: updatedTodos
    });
    // update localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  onComplete(item) {
    var updatedTodos = this.state.todos.filter(function(val, index) {
      return item !== val;
    });

    var updatedTodosCompleted = this.state.completed;
    updatedTodosCompleted.unshift(item);
    this.setState({
      todos: updatedTodos,
      completed: updatedTodosCompleted
    });
    // update localStorage
    localStorage.setItem("completed", JSON.stringify(updatedTodosCompleted));
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  onDeleteCompleted(item) {
    var updatedTodos = this.state.completed.filter(function(val, index) {
      return item !== val;
    });
    this.setState({
      completed: updatedTodos
    });
    // update localStorage
    localStorage.setItem("completed", JSON.stringify(updatedTodos));
  }
  onReAdded(item) {
    var updatedTodos = this.state.todos;
    updatedTodos.push(item);
    var updatedTodosCompleted = this.state.completed.filter(function(
      val,
      index
    ) {
      return item !== val;
    });
    this.setState({
      todos: updatedTodos,
      completed: updatedTodosCompleted
    });
    // update localStorage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    localStorage.setItem("completed", JSON.stringify(updatedTodosCompleted));
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

  componentDidMount() {}
}

export default App;
