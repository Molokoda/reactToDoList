import React from 'react';
class DeleteSomeOne extends React.Component{
    constructor(props){
        super(props);
        this.DeleteOne = this.DeleteOne.bind(this);
    }

    DeleteOne(){
        let email = document.getElementById('emailForDelete');
        let arrayOfData = JSON.parse(localStorage.getItem('listOfTasks'));
        if(email.value){
            let user = arrayOfData.find(task => task.email === email.value);
            if(user){
                let index = 0;
                while(user !== arrayOfData[index]){
                    index++;
                }
                for(let i = index; i < arrayOfData.length - 1; i++){
                    arrayOfData[i] = arrayOfData[i + 1];
                }
                arrayOfData.length -= 1;
                localStorage.setItem('listOfTasks', JSON.stringify(arrayOfData));
                this.props.ChangeArrayOfTasks(arrayOfData);
            }
            else{
                alert('There is no task with such email');
            }
        }
    }

    render(){
        return(
            <div id = "deleteForm">
                <span>User email for delete</span>
                <input id = "emailForDelete"/>
                <button onClick = {this.DeleteOne}>delete</button>
            </div>
        )
    }
}

export {DeleteSomeOne};