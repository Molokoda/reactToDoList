import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {CreateTaskForm} from './createTaskForm';
import {TaskForm} from './taskForm.js';
import {SorterFilter} from './SorterFinder';


function ShowTaskList(){
  const [show, setShow] = useState('taskList');
  const [arrayOfTasks, setArrayOfTasks] = useState(JSON.parse(localStorage.getItem('listOfTasks')));
  const [index, setIndex] = useState(0);
  const [task, setTask] = useState('');
  if(show === 'taskList'){
    if(arrayOfTasks){
      return(
        <div id = "listOfTasks">
          <SorterFilter  changeArrayOfTasks = {setArrayOfTasks}/>
          {
            arrayOfTasks.map( (element, index) => ( <TaskForm changeArrayOfTasks = {setArrayOfTasks} setIndex = {setIndex} setTask = {setTask}
                               setShow = {setShow} key = {index} id = {index} data = {element}/>))
          }
          <button onClick = {() => setShow('createTask')}>more</button>
        </div>
      )
    }
    else{
      return(
        <div id = "listOfTasks">
          <button onClick = {() => setShow('createTask')}>more</button>
        </div>
      )
    }
  }
  else if(show === 'createTask'){
    return(
      <CreateTaskForm changeArrayOfTasks = {setArrayOfTasks} showAll = {setShow}/>
    )
  }
  else if(show === 'editTask'){
    return(
      <CreateTaskForm changeArrayOfTasks = {setArrayOfTasks} showAll = {setShow} index = {index} task = {task}/>
    )
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
