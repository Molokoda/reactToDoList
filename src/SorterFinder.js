import React from 'react';

function sortMas(key, massive){
    let firstData;
    let secondData;
    for(let i = massive.length - 1; i > 0; i--){
        for(let j = 0; j < i; j++){
            firstData = massive[j];
            firstData = firstData[key].split('-');
            secondData = massive[j + 1];
            secondData = secondData[key].split('-');
            if(Number(firstData[0]) > Number(secondData[0]) ){
                [massive[j], massive[j + 1]] = [massive[j + 1], massive[j]];
            }
            else if( Number(firstData[0]) === Number(secondData[0]) ){
                if(Number(firstData[1]) > Number(secondData[1]) ){
                    [massive[j], massive[j + 1]] = [massive[j + 1], massive[j]];
                }
                else if( Number(firstData[1]) === Number(secondData[1]) ){
                    if(Number(firstData[2]) > Number(secondData[2]) ){
                        [massive[j], massive[j + 1]] = [massive[j + 1], massive[j]];
                    }
                }
            }
        }
    }
    return massive;
}

function sortTask(changeArrayOfTasks){
    let sort = document.getElementById('sort');
    let filter = document.getElementById('filter');
    let arrayOfTasks = JSON.parse(localStorage.getItem('listOfTasks'));
    let mas;
    if(sort.value){
        mas = sortMas(sort.value, arrayOfTasks);
        changeArrayOfTasks(mas);
    }

    if(filter.value === 'all' && mas){
        changeArrayOfTasks(mas);
    }
    else if(filter.value === 'all'){
        changeArrayOfTasks(arrayOfTasks);
    }
    else if(filter.value){
        mas = arrayOfTasks.filter(element => element.type === filter.value);
        changeArrayOfTasks(mas);
    }
}

function SorterFilter(props){
    return(
        <div id = "sorterFilter">
            <span>Sort By</span>
            <select id = "sort" defaultValue = "">
                <option value = "" disabled hidden>Choose sort</option>
                <option value = "dataStart">By Start Date</option>
                <option value = "dataEnd">By End Date</option>  
            </select>
            <span>Filter By</span>
            <select id = "filter" defaultValue = "">
                <option value = "" disabled hidden>Choose filter</option>
                <option value = "all">all</option>
                <option value = "common">important: common</option>
                <option value = "high">important: high</option>
            </select>
            <button onClick = {() => sortTask(props.changeArrayOfTasks)}>Enter</button>
        </div>
    )
}

export {SorterFilter};