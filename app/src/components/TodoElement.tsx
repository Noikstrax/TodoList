'use client';

import {useState, useRef, useEffect, useReducer} from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';
import TodoTask from '../todoTask/TodoTask';
import TodoName from '../todoName/todoName';
import { todo } from 'node:test';




type TodoElementComponentProps = {
    todoItem: TodoItem,
    updateTodoItems: (itemId: string, newTodoItem: TodoItem) => void,
    handleCheckElement: (elementId: string) => void,
    handleDeleteElement: (elementId: string, orderNumber: number) => void

}

// DRY!!!
type SubTask = {
    id: string,
    taskName: string,
    isCompleted: boolean,
    order: number
};
type TodoItem = {
  id: string,
  name: string,
  isCompleted: boolean,
  tasks: SubTask[],
  order: number;
}

type TodoState = TodoItem[];




export default function TodoElement({todoItem, updateTodoItems, handleCheckElement, handleDeleteElement}: TodoElementComponentProps) {


    const todoElementData = todoItem;
    const [currentTask, setCurrentTask] = useState<SubTask | null>(null);


    const sortTasks = (a: SubTask, b: SubTask) => {
        if (a.order > b.order) {
            return 1;
        } else {
            return -1;
        }
    };

    function updateName(name: string): void {
        const newNameState = {
            ...todoElementData,
            name: name,
        }
        updateTodoItems(todoElementData.id, newNameState);
    }

    function handleAddTask(taskValue: string): void {
        const newTasksState = {
            ...todoElementData,
            tasks: [
                ...todoElementData.tasks,
                {
                    taskName: taskValue,
                    isCompleted: false,
                    id: nanoid(),
                    order: todoElementData.tasks.length
                }
            ]
        };
        updateTodoItems(todoElementData.id, newTasksState);
    }


    function handleUpdateTask(taskNameValue: string, taskId: string): void {
        const newTasksState = {
            ...todoElementData,
            tasks: todoElementData.tasks.map(task => {
                if(task.id === taskId) {
                    return {
                        ...task,
                        taskName: taskNameValue
                    };
                } else {
                    return task;
                }
            }) 
        };
        updateTodoItems(todoElementData.id, newTasksState);
    }

    function handleRemoveTask(taskId: string, orderNumber: number): void {
        const newTasksState = {
            ...todoElementData,
            tasks: todoElementData.tasks.filter(task => task.id != taskId).map((taskE) => {
                if (taskE.order > orderNumber) {
                    return {
                        ...taskE,
                        order: taskE.order - 1,
                    };
                } else {
                    return taskE;
                }
            }),
        };
        updateTodoItems(todoElementData.id, newTasksState);
    }

    function handleChangeCheckbox(taskId: string): void {
        const newTasksState = {
            ...todoElementData,
            tasks: todoElementData.tasks.map((task: SubTask) => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        isCompleted: !task.isCompleted,
                    };
                    } else {
                    return task;
                    }
            })
        }
        updateTodoItems(todoElementData.id, newTasksState);
    }



    function dragStartHandler(e: React.DragEvent, todoTask: SubTask) {
        setCurrentTask(todoTask);
    }

    function dropHandler(e: React.DragEvent, task: SubTask) {
        e.preventDefault();
        if (task !== null && currentTask !== null) {
          console.log('currentTask:', currentTask.id);
          let tempStateTasks = todoElementData.tasks;
          tempStateTasks = tempStateTasks.map((itemTask: SubTask) => {
            if (itemTask.id === task.id) {
                return {...itemTask, order: currentTask.order}
            }
            if (itemTask.id === currentTask.id) {
                return {...itemTask, order: task.order};
            };
            return itemTask;
          });
          console.log(tempStateTasks);
          let tempState = {
          ...todoElementData,
          tasks: tempStateTasks
          };
          updateTodoItems(todoElementData.id, tempState);
        }
        console.log('dropTask', task.id);
    }


        return(
            <div className={''} 
            >
            <div className="todo-element" key={todoElementData.id}>
                <div className='todo-element-header'>
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
                </div>
                <div className='item-scroll'>
                    <div className='todo-tasks'>
                        {todoElementData.tasks.sort(sortTasks).map((task: SubTask) => (
                            <div key={task.id}
                            draggable={true}
                            onDragStart={(e) => {
                                dragStartHandler(e, task);
                      
                              }}
                              onDragEnd={(e) => {
                               // dragEndHandler(e);
                                
                              }}
                              
                              onDragLeave={(e) => {
                                //dragEndHandler(e);
                      
                              }}
                              
                              onDragOver={(e) => {
                               // dragOverHandler(e);
                      
                              }}
                              onDrop={(e) => {
                                dropHandler(e, task);
                      
                              }}>
                                <TodoTask task={task}
                                handleChangeCheckbox={handleChangeCheckbox} handleRemoveTask={handleRemoveTask} updateTask={handleUpdateTask} />
                            </div>
                            
                        ))}
                    </div>
                </div>
                <div className='task-add'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.target as HTMLFormElement;
                        const taskName = target.elements.namedItem('taskName') as HTMLInputElement;
                        handleAddTask(taskName.value);
                        taskName.value = "";
                    }}>
                        <input type="text" name='taskName' />
                        <button className='add-task-button' type="submit">+</button>
                    </form>
                </div>
            </div>
            </div>
        
            )
    
}