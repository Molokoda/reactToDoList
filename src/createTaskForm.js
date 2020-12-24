import React from 'react';

function TestFirstName(){
  let name = document.getElementById('firstName');
  if(name.value.match(/^[A-Za-z]{1}[a-z]{3,10}$/)){
    name.style.borderColor = 'green';
  }
  else{
    name.style.borderColor = 'red';
  }
}

function TestLastName(){
  let name = document.getElementById('lastName');
  if(name.value.match(/^[A-Z a-z]{1}[a-z]{3,10}$/)){
    name.style.borderColor = 'green';
  }
  else{
    name.style.borderColor = 'red';
  }
}

function TestEmail(){
  let name = document.getElementById('email');
  if(name.value.match(/^[A-Za-z]{1}[A-Za-z0-9]{1,}@{1}[a-z]{3,}\.[a-z]{2,4}/)){
    name.style.borderColor = 'green';
  }
  else{
    name.style.borderColor = 'red';
  }
}

function TestDateFrom(){
  let name = document.getElementById('from');
  if(name.value){
    name.style.borderColor = 'green';
  }
  else{
    name.style.borderColor = 'red';
  }
}

function TestDateTo(){
  let name = document.getElementById('to');
  if(name.value){
    name.style.borderColor = 'green';
  }
  else{
    name.style.borderColor = 'red';
  }
}

function TestType(){
  let name = document.getElementById('type');
  if(name.value){
    name.style.borderColor = 'green';
  }
  else{
    name.style.borderColor = 'red';
  }
}

class CreateTaskForm extends React.Component{
  constructor(props){
    super(props);
    this.getInfo = this.getInfo.bind(this);
  }

  getInfo(){
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
      alert('Incorrect First Name');
    }

    if(!task.lastName.match(/^[A-Za-z]{1}[a-z]{3,10}$/)){
      isDataCorrect = false;
      alert('Incorrect Last Name');
    }

    if(!task.email.match(/^[A-Za-z]{1}[A-Za-z0-9]{1,}@{1}[a-z]{3,}\.[a-z]{2,4}/)){
      isDataCorrect = false;
      alert('Incorrect email');
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
      if((this.props.index || this.props.index === 0) && this.props.task){
        arrayOfTasks[this.props.index] = task;
        localStorage.setItem('listOfTasks', JSON.stringify(arrayOfTasks));
        this.props.ShowAll();
        this.props.ChangeArrayOfTasks(arrayOfTasks);
      }
      else{
        if(arrayOfTasks){
          arrayOfTasks = JSON.parse(arrayOfTasks);
          arrayOfTasks.push(task);
          localStorage.setItem('listOfTasks', JSON.stringify(arrayOfTasks));
          this.props.ShowAll();
          this.props.ChangeArrayOfTasks(arrayOfTasks);
        }
        else{
          arrayOfTasks = [];
          arrayOfTasks.push(task);
          localStorage.setItem('listOfTasks', JSON.stringify(arrayOfTasks));
          this.props.ShowAll();
          this.props.ChangeArrayOfTasks(arrayOfTasks);
        }
      }
    } 
  }

  render(){
    if(this.props.task){
      return(
        <div id = "createForm">
            <div>
              <span>First name</span>
              <input value = {this.props.task.firstName} id = "firstName" onChange = {TestFirstName}/>    
            </div>
  
            <div>
              <span>Last name</span>
              <input value = {this.props.task.lastName} onChange = {TestLastName} id = "lastName"/>    
            </div>
  
            <div>
              <span>email</span>
              <input value = {this.props.task.email} onChange = {TestEmail} id = "email"/>    
            </div>
  
            <div id = "fromTo">
              <span>from</span>
              <input value = {this.props.task.dataStart} onChange = {TestDateFrom} id = "from" type = "date"/>  
              <span>to</span>
              <input value = {this.props.task.dataEnd} onChange = {TestDateTo} id = "to" type = "date"/>  
            </div>
  
            <div >
              <span>type</span>
              <select onChange = {TestType} id = "type" defaultValue = {this.props.task.type}>
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
              <textarea>{this.props.task.comment}</textarea>   
            </div>
            <div>
              <button onClick = {this.getInfo}>create</button>
              <button onClick ={this.props.ShowAll}>back</button>
            </div>
        </div>
      );
    }
    else{
      return(
        <div id = "createForm">
            <div>
              <span>First name</span>
              <input id = "firstName" onChange = {TestFirstName}/>    
            </div>
  
            <div>
              <span>Last name</span>
              <input onChange = {TestLastName} id = "lastName"/>    
            </div>
  
            <div>
              <span>email</span>
              <input onChange = {TestEmail} id = "email"/>    
            </div>
  
            <div id = "fromTo">
              <span>from</span>
              <input onChange = {TestDateFrom} id = "from" type = "date"/>  
              <span>to</span>
              <input onChange = {TestDateTo} id = "to" type = "date"/>  
            </div>
  
            <div >
              <span>type</span>
              <select onChange = {TestType} id = "type" defaultValue = "">
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
              <textarea></textarea>   
            </div>
            <div>
              <button onClick = {this.getInfo}>create</button>
              <button onClick ={this.props.ShowAll}>back</button>
            </div>
        </div>
      );
    }
  }
}


// let form = document.getElementById('createForm');
// form.addEventListener('submit', (event) => {
//   event.preventDefault();
// } );
export {CreateTaskForm};