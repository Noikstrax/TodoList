'use client';
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";


type SubTask = {
  id: string,
  taskName: string,
  isCompleted: boolean,
  order: number
}

type TodoTaskComponentProps = {
  task: SubTask,
  updateTask: (taskNameValue: string, taskId: string) => void,
  handleChangeCheckbox: (taskId: string) => void,
  handleRemoveTask: (taskId: string, orderNumber: number) => void
};

export default function TodoTask({task, updateTask, handleChangeCheckbox, handleRemoveTask}: TodoTaskComponentProps) {
    const [isEditing, setIsEditing] = useState(false);

    const inputAreaRef = useRef<HTMLInputElement | null>(null);

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
                 <div className="task" key={`${task.id}`}>
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
                    handleRemoveTask(task.id, task.order);
                  }}>Del</button>
            
                 </div>
            </>
    
        )

    } else {
        return (
            <>
            <div className="task" key={`${task.id}`}>
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
                const target = e.target as HTMLFormElement;
                updateTask(target.value, task.id);
                handleClick();
              }
             }}></input>
             <button onClick={(e) => {
               e.preventDefault();
               handleRemoveTask(task.id, task.order);
             }}>Del</button>
       
            </div>
       </>

        )


    }
    
}