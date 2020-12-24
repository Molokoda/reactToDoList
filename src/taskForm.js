import React from 'react';

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
        </div>
    )
}

export {TaskForm};