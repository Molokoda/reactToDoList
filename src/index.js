import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {CreateTaskForm} from './createTaskForm';
import {TaskForm} from './taskForm.js';
import {SorterFilter} from './SorterFinder';
import {DeleteSomeOne} from './deleteSomeOne';
import {EditSomeOne} from './editSomeOne';

class ShowTaskList extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      show: 'tasksList',
      arrayOfTasks: JSON.parse(localStorage.getItem('listOfTasks')),
      index: 0,
      task: ''
    });
  
    this.OnMoreClick = this.OnMoreClick.bind(this);
    this.ShowAll = this.ShowAll.bind(this);
    this.ChangeArrayOfTasks = this.ChangeArrayOfTasks.bind(this);
    this.SetIndexAndTask = this.SetIndexAndTask.bind(this);
  }

  OnMoreClick(){
    this.setState({show: 'createTask'});
  }

  ShowAll(){
    this.setState({show: 'tasksList'});
  }

  ChangeArrayOfTasks(massive){
    this.setState({arrayOfTasks: massive});
  }

  SetIndexAndTask(index, task){
    this.setState({index: index});
    this.setState({task: task});
    this.setState({show: 'editTask'})
  }

  render(){
    if(this.state.show === 'tasksList'){
      if(this.state.arrayOfTasks){
        
        return(
          <div id = "listOfTasks">
            <SorterFilter  ChangeArrayOfTasks = {this.ChangeArrayOfTasks}/>
            <DeleteSomeOne ChangeArrayOfTasks = {this.ChangeArrayOfTasks}/>
            <EditSomeOne SetIndexAndTask = {this.SetIndexAndTask}/>
            {
              this.state.arrayOfTasks.map( element => ( <TaskForm data = {element}/>))
            }
            <button onClick = {this.OnMoreClick}>more</button>
          </div>
        )
      }
      else{
        return(
          <div id = "listOfTasks">
            <button onClick = {this.OnMoreClick}>more</button>
          </div>
        )
      }
      
    }
    else if(this.state.show === 'createTask'){
      return(
        <CreateTaskForm ShowAll = {this.ShowAll}/>
      )
    }
    else if(this.state.show === 'editTask'){
      return(
        <CreateTaskForm ChangeArrayOfTasks = {this.ChangeArrayOfTasks} ShowAll = {this.ShowAll} index = {this.state.index} task = {this.state.task}/>
      )
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ShowTaskList/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
