import React from 'react';

function getTask(key , setIndex, setTask, setShow){
    
    let arrayOfTasks = JSON.parse(localStorage.getItem('listOfTasks'));
    setIndex(key);
    setTask(arrayOfTasks[key]);
    setShow('editTask');
}

function deleteOne(key, changeArrayOfTasks){
    let arrayOfData = JSON.parse(localStorage.getItem('listOfTasks'));
    for(let i = key; i < arrayOfData.length - 1; i++){
        arrayOfData[i] = arrayOfData[i + 1];
    }
    arrayOfData.length -= 1;
    localStorage.setItem('listOfTasks', JSON.stringify(arrayOfData));
    changeArrayOfTasks(arrayOfData);
}

function TaskForm(props){
    return(
        <div className = "task">
            <div className = "userInfo">
                <span>First Name: {props.data.firstName}</span>
                <span>Last Name: {props.data.lastName}</span>
                <span>email: {props.data.email}</span>
            </div>

            <div className = "additionalInfo">
                <span>start data: {props.data.dataStart}</span>
                <span>end data: {props.data.dataEnd}</span>
                <span>type: {props.data.type}</span>
                <span>report: {props.data.makeReport}</span>
            </div>

            <div>
                <span>task: {props.data.comment}</span>
            </div>

            <div>
                <button onClick = {() => getTask(props.id, props.setIndex, props.setTask, props.setShow)}>edit</button>
                <button onClick = {() => deleteOne(props.id, props.changeArrayOfTasks)}>delete</button>
            </div>
        </div>
    )
}

export {TaskForm};