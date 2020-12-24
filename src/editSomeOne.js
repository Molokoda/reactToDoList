import React from 'react';
class EditSomeOne extends React.Component{
   constructor(props){
       super(props);
        this.GetTask = this.GetTask.bind(this);
   }

   GetTask(){
        let email = document.getElementById('emailForEdit');
        let arrayOfTasks = JSON.parse(localStorage.getItem('listOfTasks'));
        let index = 0;
        while(email.value !== arrayOfTasks[index].email && index !== arrayOfTasks.length - 1){
            index++
        }

        if(index === arrayOfTasks.length - 1 && email.value !== arrayOfTasks[index].email){
            alert('There is no such email');
        }
        else{
            this.props.SetIndexAndTask(index, arrayOfTasks[index]);
        }
   }

    render(){
        return(
            <div id = "startEditForm">
                <span>User email for edit</span>
                <input id = "emailForEdit"/>
                <button onClick = {this.GetTask}>Start edit</button>
            </div>
        )
    }
}

export {EditSomeOne};