'use client';

import styles from './todoElement.module.css';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';



export default function TodoElement({elementData, id, updateTodoItems, handleDeleteElement, handleCheckElement}) {


  const [todoElementData, setTodoElementData] = useState(elementData);

  useEffect(() => {
    updateTodoItems(id, todoElementData);
  }, [todoElementData, id]);

  function toggleChecked(e) {
    e.target.checked = !e.target.checked;
    console.log(e.target.checked);
  }
    
  function handleAddTask(taskValue) {
   setTodoElementData({
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
  
  function handleRemoveTask(taskId) {
    setTodoElementData({
      ...todoElementData,
      tasks: [...todoElementData.tasks.filter(task => task.id != taskId)],
    })
  }

  function handleChangeCheckbox(taskId) {
    setTodoElementData({
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
    <div className={styles.wrapper}>
    <div className="todo-element" key={todoElementData.id}>
     <div className="name">
     <input className='todo-item-checkbox' type="checkbox" defaultChecked={todoElementData.isCompleted} onClick={(e) => {
      console.log(`Item:id: ${todoElementData.id}`);
      handleCheckElement(todoElementData.id);
     }}/>
     <h1>{todoElementData.name}</h1>
     <button onClick={(e) => {
      e.preventDefault();
      console.log(`Item:id: ${todoElementData.id}`);
      handleDeleteElement(todoElementData.id);
     }}>Del</button>
     </div>
     <div className="todo-tasks">
     {todoElementData.tasks.map(task => (
     <div className="task" key={`${task.id}-${todoElementData.id}`}>
       <input type="checkbox" defaultChecked={task.isCompleted} onClick={(e) => {
        handleChangeCheckbox(task.id);
      }}/>
      <p>{task.taskName}</p>
      <button onClick={(e) => {
        e.preventDefault();
        handleRemoveTask(task.id);
      }}>Del</button>

     </div>
     ))}
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
