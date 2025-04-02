'use client';

import styles from './todoElement.module.css';
import { useState } from 'react';
import { nanoid } from 'nanoid';



export default function TodoElement({elementData}) {


  const [todoElementData, setTodoElementData] = useState(elementData);

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
  return (
    <div className={styles.wrapper}>
    <div className="todo-element" key={todoElementData.id}>
     <div className="name">
     <h1>{todoElementData.name}</h1>
     <input type="checkbox" aria-checked={todoElementData.isCompleted}/>
     </div>
     <div className="todo-tasks">
     {todoElementData.tasks.map(task => (
     <div className="task" key={`${task.id}-${todoElementData.id}`}>
      <p>{task.taskName}</p>
      <input type="checkbox" defaultChecked={task.isCompleted}/>
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
     <button type="submit">+</button>
     </form>
     </div>
    </div>
    </div>
  )
}
