import React, { useState, useEffect, useRef } from 'react';

function testFirstName(){
  let name = document.getElementById('firstName');
  if(name.value.match(/^[A-Za-z]{1}[a-z]{3,10}$/)){
    name.style.borderColor = 'green';
  }
  else{
    name.style.borderColor = 'red';
  }
}

function minDate(){
  const startDate = document.getElementById('from');
  const endDate = document.getElementById('to');
  endDate.min = startDate.value;
}

function doubleFunction(){
  minDate();
  testDateFrom();
}

function testLastName(){
  let name = document.getElementById('lastName');
  if(name.value.match(/^[A-Z a-z]{1}[a-z]{3,10}$/)){
    name.style.borderColor = 'green';
  }
  else{
    name.style.borderColor = 'red';
  }
}

function testEmail(){
  let name = document.getElementById('email');
  if(name.value.match(/^[A-Za-z]{1}[A-Za-z0-9]{1,}@{1}[a-z]{3,}\.[a-z]{2,4}/)){
    name.style.borderColor = 'green';
  }
  else{
    name.style.borderColor = 'red';
  }
}

function testDateFrom(){
  let name = document.getElementById('from');
  if(name.value){
    name.style.borderColor = 'green';
  }
  else{
    name.style.borderColor = 'red';
  }
}

function testDateTo(){
  let name = document.getElementById('to');
  if(name.value){
    name.style.borderColor = 'green';
  }
  else{
    name.style.borderColor = 'red';
  }
}

function testType(){
  let name = document.getElementById('type');
  if(name.value){
    name.style.borderColor = 'green';
  }
  else{
    name.style.borderColor = 'red';
  }
}

function getInfo(index, editTask, showAll, changeArrayOfTasks){
  let form = document.getElementById('createForm');
  let arrayOfData = form.querySelectorAll('input');
  let type = document.getElementById('type');
  let comment = form.querySelector('textarea');
  let task = {
      firstName: '',
      lastName: '',
      email: '',
      dataStart: '',
      dataEnd: '',
      makeReport: '',
      type: '',
      comment: ''
  }
  let i = 0;
  for(let key in task){
      if(arrayOfData[i]){
          task[key] = arrayOfData[i].value;
      }
      
      i++;
  }
  task.makeReport = String(arrayOfData[5].checked);
  task.type = type.value;
  task.comment = comment.value;

  let isDataCorrect = true;
  if(!task.firstName.match(/^[A-Za-z]{1}[a-z]{3,10}$/)){
    isDataCorrect = false;
    alert('First Name must have only english letters and must be longer then 4');
  }

  if(!task.lastName.match(/^[A-Za-z]{1}[a-z]{3,10}$/)){
    isDataCorrect = false;
    alert('Last Name must have only english letters and must be longer then 4');
  }

  if(!task.email.match(/^[A-Za-z]{1}[A-Za-z0-9]{1,}@{1}[a-z]{3,}\.[a-z]{2,4}/)){
    isDataCorrect = false;
    alert('Email must have format: example@mail.ru');
  }

  if(!task.dataStart){
    isDataCorrect = false;
    alert('Choose start data');
  }

  if(!task.dataEnd){
    isDataCorrect = false;
    alert('Choose end data');
  }

  if(!task.type){
    isDataCorrect = false;
    alert('Choose type');
  }

  if(!task.comment){
    isDataCorrect = false;
    alert('Write comment');
  }

  if(isDataCorrect){
    let arrayOfTasks = JSON.parse(localStorage.getItem('listOfTasks'));
    if(editTask){
      arrayOfTasks[index] = editTask;
      localStorage.setItem('listOfTasks', JSON.stringify(arrayOfTasks));
      showAll('taskList');
      changeArrayOfTasks(arrayOfTasks);
    }
    else{
      if(arrayOfTasks){
        arrayOfTasks.push(task);
        localStorage.setItem('listOfTasks', JSON.stringify(arrayOfTasks));
        showAll('taskList');
        changeArrayOfTasks(arrayOfTasks);
      }
      else{
        arrayOfTasks = [];
        arrayOfTasks.push(task);
        localStorage.setItem('listOfTasks', JSON.stringify(arrayOfTasks));
        showAll('taskList');
        changeArrayOfTasks(arrayOfTasks);
      }
    }
  } 
}

function CreateTaskForm(props){

  const [task, setTask] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dataStart: '',
    dataEnd: '',
    makeReport: '',
    type: '',
    comment: ''
  });
  const textInput = useRef(null);

  function handleClick(){
    textInput.current.focus();  
  }

  useEffect( () => {
    handleClick();
    if(props.task){
      setTask(props.task);
    }
  }, [props.task]);

  return(
    <div id = "createForm">
        <div>
          <span >First name</span>
          <input ref = {textInput} defaultValue = {task.firstName} id = "firstName" onChange = {() => testFirstName}/>    
        </div>

        <div>
          <span>Last name</span>
          <input defaultValue = {task.lastName} onChange = {testLastName} id = "lastName"/>    
        </div>

        <div>
          <span>email</span>
          <input defaultValue = {task.email} onChange = {testEmail} id = "email"/>    
        </div>

        <div id = "fromTo">
          <span>from</span>
          <input defaultValue = {task.dataStart} onChange = {doubleFunction} id = "from" type = "date"/>  
          <span>to</span>
          <input defaultValue = {task.dataEnd} onChange = {testDateTo} id = "to" type = "date"/>  
        </div>

        <div >
          <span>type</span>
          <select onChange = {testType} id = "type" defaultValue = {task.type}>
            <option value = "" disabled hidden>Choose important</option>
            <option value = "common">common</option>
            <option value = "high">high</option>
          </select>
        </div>

        <div id = "report">
          <input type = "checkbox"/>   
          <span>make report</span> 
        </div>

        <div id = "comment">
          <span>comment:</span>
          <textarea defaultValue = {task.comment}></textarea>   
        </div>
        <div>
          <button onClick = {() => getInfo(props.index, props.task, props.showAll, props.changeArrayOfTasks)}>create</button>
          <button onClick ={() => props.showAll('taskList')}>back</button>
        </div>
    </div>
  );
}

export {CreateTaskForm};