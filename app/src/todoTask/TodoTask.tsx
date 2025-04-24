'use client';
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

export default function TodoTask({task, todoElementData, updateTask, handleChangeCheckbox, handleRemoveTask}) {
    const [isEditing, setIsEditing] = useState(false);

    const inputAreaRef = useRef(null);

    function handleClick() {
        setIsEditing(!isEditing);
    }


    useEffect(() => {
        if (isEditing && inputAreaRef.current) {
            inputAreaRef.current.focus();
        }
    }, [isEditing]);


    if (!isEditing) {
        return (
            <>
                 <div className="task" key={`${task.id}-${todoElementData.id}`}>
                   <input type="checkbox" defaultChecked={task.isCompleted} onClick={(e) => {
                    handleChangeCheckbox(task.id);
                  }}/>
                  <p className={clsx('',
                  task.isCompleted && 'text-completed')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                  }}>{task.taskName}</p>
                  <button onClick={(e) => {
                    e.preventDefault();
                    handleRemoveTask(task.id);
                  }}>Del</button>
            
                 </div>
            </>
    
        )

    } else {
        return (
            <>
            <div className="task" key={`${task.id}-${todoElementData.id}`}>
              <input type="checkbox" defaultChecked={task.isCompleted} onClick={(e) => {
               handleChangeCheckbox(task.id);
             }}/>
             <input type="text" className={clsx('',
             task.isCompleted && 'text-completed')} defaultValue={task.taskName}
             onBlur={(e) => {
                e.preventDefault();
                if (task.taskName !== e.target.value) updateTask(e.target.value, task.id);
                handleClick();
             }}
             ref={inputAreaRef}
             onKeyDown={(e) => {
              if (isEditing && e.key === 'Enter') {
                updateTask(e.target.value, task.id);
                handleClick();
              }
             }}></input>
             <button onClick={(e) => {
               e.preventDefault();
               handleRemoveTask(task.id);
             }}>Del</button>
       
            </div>
       </>

        )


    }
    
}