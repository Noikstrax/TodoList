'use client';

import styles from './todoElement.module.css';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import clsx from 'clsx';
import TodoTask from '../todoTask/TodoTask';
import TodoName from '../todoName/todoName';



export default function TodoElement({elementData, id, updateTodoItems, handleDeleteElement, handleCheckElement}) {


  const todoElementData = elementData;

  function updateElement(newData) {
    updateTodoItems(id, newData);
  }

  useEffect(() => {
    updateTodoItems(id, todoElementData);
  }, [todoElementData, id]);


  // useEffect(() => {
  //   updateElement(elementData);
  // }, [elementData]);

  function toggleChecked(e) {
    e.target.checked = !e.target.checked;
    console.log(e.target.checked);
  }
    
  function handleAddTask(taskValue) {
   updateElement({
     ...todoElementData,
     tasks: [
       ...todoElementData.tasks,
       {
         taskName: taskValue,
         isCompleted: false,
         id: nanoid(),
       }
     ]
   }) 
  }

  function handleUpdateTask(taskValue, taskId) {
    try {
      updateElement({
        ...todoElementData,
        tasks: todoElementData.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                taskName: taskValue,
  
              }
            } else {
              return task;
            }
          })
      })
    } catch(error) {
      console.error(error);
    }

  }

  function handleUpdateTaskName(todoNameValue) {
    try {
      updateElement({
        ...todoElementData,
        name: todoNameValue
      })
    } catch(err) {
      console.error(err);
    }
  }
  
  function handleRemoveTask(taskId) {
    updateElement({
      ...todoElementData,
      tasks: [...todoElementData.tasks.filter(task => task.id != taskId)],
    })
  }

  function handleChangeCheckbox(taskId) {
    updateElement({
      ...todoElementData,
      tasks: [...todoElementData.tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          }
        } else {
          return task;
        }
      })]
    })
  }


  return (
    <div className={styles.wrapper} 
    >
    <div className="todo-element" key={todoElementData.id}>
     <div className={clsx('name',
      todoElementData.isCompleted && 'text-completed')}>
     <input className='todo-item-checkbox' type="checkbox" defaultChecked={todoElementData.isCompleted} onClick={(e) => {
      //console.log(`Item:id: ${todoElementData.id}`);
      handleCheckElement(todoElementData.id);
     }}/>
     <TodoName todoName={todoElementData.name} updateName={handleUpdateTaskName}/>
     <button onClick={(e) => {
      e.preventDefault();
      console.log(`Item:id: ${todoElementData.id}`);
      handleDeleteElement(todoElementData.id, todoElementData.order);
     }}>Del</button>
     </div>
     <div className='item-scroll'>
     <div className="todo-tasks">
     {todoElementData.tasks.map(task => (
      <TodoTask key={task.id} task={task} todoElementData={todoElementData} handleChangeCheckbox={handleChangeCheckbox} handleRemoveTask={handleRemoveTask} updateTask={'test'} updateTask={handleUpdateTask}/>
    //  <div className="task" key={`${task.id}-${todoElementData.id}`}>
    //    <input type="checkbox" defaultChecked={task.isCompleted} onClick={(e) => {
    //     handleChangeCheckbox(task.id);
    //   }}/>
    //   <p className={clsx('',
    //   task.isCompleted && 'text-completed')}>{task.taskName}</p>
    //   <button onClick={(e) => {
    //     e.preventDefault();
    //     handleRemoveTask(task.id);
    //   }}>Del</button>

    //  </div>
     ))}
     </div>
     </div>
     <div className="task-add">
     <form onSubmit={(e) => {
       e.preventDefault();
       handleAddTask(e.target.taskName.value);
       e.target.taskName.value = "";
     }}>
     <input type="text" name="taskName"/>
     <button className='add-task-button' type="submit">+</button>
     </form>
     </div>
    </div>
    </div>
  )
}
