import React, { Component } from "react";
import { Router, Route, Link } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import  $ from "jquery";
import "./App.css";
import "./dnd.css";
// Module requires
import AddItem from "./addItem";
import About from "./about";
import TodoItem from "./TodoItem";
import CompletedItem from "./completedItem";
import BrowserDetection from "react-browser-detection";
const browserHandler = {
  chrome: () => <div className="cover-bar" />,
  firefox: () => <div className="cover-bar width-15" />
};
var  cachedCompleted;
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
      data: [],
      completed: []
    };
  } //constructor

  render() {
    var completed = this.state.completed;
    completed = completed.map(
      function(data, index) {
        return (
          <CompletedItem
            item={data.item}
            data-id={data.id}
            data-index={index}
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
            <TodoItem
              todos={this.state.data}
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
    $.ajax({
      url:  'http://localhost/ReactTodolist/todo-app/src/server.php?todo='+item,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.todos});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
    this.fetchAll();
  }
  onComplete(id) {
    $.ajax({
      url:  'http://localhost/ReactTodolist/todo-app/src/complete.php?id='+id,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({completed: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
    this.fetchAll();
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

   fetchAll(){
    $.ajax({
      url:  'http://localhost/ReactTodolist/todo-app/src/server.php',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.todos,completed:data.completed});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }
    });

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
