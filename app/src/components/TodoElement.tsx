'use client';

import {useState, useRef, useEffect} from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';
import TodoTask from '../todoTask/TodoTask';
import TodoName from '../todoName/todoName';
import { todo } from 'node:test';


export default function TodoElement({todoItem, updateTodoItems, handleCheckElement, handleDeleteElement}) {


    const todoElementData = todoItem;

    const sortTasks = (a, b) => {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    }

//    useEffect(() => {
//       updateTodoItems(todoElementData.id, todoElementData);

//    }, [todoElementData, updateTodoItems])

    function updateName(name: string): void {
        const newNameState = {
            ...todoElementData,
            name: name,
        }
        
        updateTodoItems(todoElementData.id, newNameState);
    }


        return(
            <div className={''} 
            >
            <div className="todo-element" key={todoElementData.id}>
                <div className={clsx('name',
                    todoElementData.isCompleted && 'text-completed'
                )}>
                    <input className='todo-item-checkbox' type="checkbox"
                    defaultChecked={todoElementData.isCompleted} onClick={(e) => {
                    handleCheckElement(todoElementData.id);
                    }}/>
                    <TodoName todoName={todoElementData.name} updateName={updateName} />
                    <button onClick={(e) => {
                        e.preventDefault();
                        handleDeleteElement(todoElementData.id, todoElementData.order);
                    }}>Del</button>
                </div>
                <div className='item-scroll'>
                    <div className='todo-tasks'>
                        {todoElementData.tasks.sort(sortTasks).map(task => (
                            <div key={task.id}
                            draggable={true}>
                                <TodoTask task={task} todoElementData={todoElementData}
                                handleChangeCheckbox={'test'} handleRemoveTask={'test'} updateTask={'test'} />
                            </div>
                            
                        ))}
                    </div>
                </div>
                <div className='task-add'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        //HandleAddTask
                        e.target.taskName.value = "";
                    }}>
                        <input type="text" name='taskName' />
                        <button className='add-task-button' type="submit">+</button>
                    </form>
                </div>
            </div>
            </div>
        
            )
    
}