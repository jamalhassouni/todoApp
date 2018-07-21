import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./App.css";


// Module requires
import AddItem  from "./addItem";
import CompletedItem from "./completedItem";


// Create component
class CompletedComponent extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onDeleteCompleted = this.onDeleteCompleted.bind(this);
    this.onReAdded = this.onReAdded.bind(this);
    var cachedTodos,cachedCompleted;
    localStorage.getItem("completed") == null ? cachedCompleted = [] : cachedCompleted = JSON.parse(localStorage.getItem("completed"));
    localStorage.getItem("todos") == null ? cachedTodos = [] : cachedTodos = JSON.parse(localStorage.getItem("todos"));
    this.state = {
      todos:cachedTodos,
      completed:cachedCompleted

       };

  } //constructor

  render() {
    var completed = this.state.completed;
    completed = completed.map(function(item,index){
      return <CompletedItem item={item} key={index} onDelete={this.onDeleteCompleted} onReAdded={this.onReAdded}  />;

    }.bind(this));
    return (
      <div id="todo-list">
       <AddItem onAdd={this.onAdd}/>
         <nav className="cl-effect">
       <Link  to={'/about'} >About</Link>
       <Link  to={'/'}>Uncompleted</Link>

       </nav>
       <p>
          The busiest people have the most leisure...
        </p>

          {/* Completed tasks */}
          <ul className="todo" id="completed">{completed}</ul>

      </div>
    );
  } // render
  //custom functions
  onDelete(item){
   var updatedTodos = this.state.todos.filter(function(val,index){
     return item !==val;

     });
    this.setState({
        todos: updatedTodos

   });
        // update localStorage
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  onAdd(item){

    var updatedTodos = this.state.todos;
    updatedTodos.unshift(item);
     this.setState({
         todos: updatedTodos

    });
      // update localStorage
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  onComplete(item){
    var updatedTodosCompleted = this.state.completed;
    updatedTodosCompleted.unshift(item);
    var updatedTodos = this.state.todos.filter(function(val,index){
      return item !==val;

      });
     this.setState({
      todos:updatedTodos,
      completed: updatedTodosCompleted

    });
     // update localStorage
     localStorage.setItem("todos", JSON.stringify(updatedTodos));
     localStorage.setItem("completed", JSON.stringify(updatedTodosCompleted));
  }
  onDeleteCompleted(item){
    var updatedTodos = this.state.completed.filter(function(val,index){
      return item !==val;

      });
     this.setState({
      completed: updatedTodos

    });
         // update localStorage
         localStorage.setItem("completed", JSON.stringify(updatedTodos));
  }
  onReAdded(item){
    var updatedTodos = this.state.todos;
    updatedTodos.push(item);
    var updatedTodosCompleted = this.state.completed.filter(function(val,index){
      return item !==val;

      });
     this.setState({
      todos:updatedTodos,
      completed: updatedTodosCompleted

    });
     // update localStorage
     localStorage.setItem("todos", JSON.stringify(updatedTodos));
     localStorage.setItem("completed", JSON.stringify(updatedTodosCompleted));
  }
}


export default CompletedComponent;
