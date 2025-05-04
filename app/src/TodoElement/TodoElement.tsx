// 'use client';

// import styles from './todoElement.module.css';
// import { useState } from 'react';
// import { nanoid } from 'nanoid';
// import { useEffect, useRef } from 'react';
// import clsx from 'clsx';
// import TodoTask from '../todoTask/TodoTask';
// import TodoName from '../todoName/todoName';



// export default function TodoElement({elementData, id, updateTodoItems, handleDeleteElement, handleCheckElement}) {


//   const [todoElementData, setTodoElementData] = useState(elementData);
//   const currentTask = useRef(null);

//   const sortTasks = (a, b) => {
//     if (a.order > b.order) {
//       return 1;
//     } else {
//       return -1;
//     }
  
//   }

//   function updateElement(newData) {
//     updateTodoItems(id, newData);
//   }

//   useEffect(() => {
//     updateTodoItems(id, todoElementData);
//   }, [todoElementData, id]);


//   // useEffect(() => {
//   //   updateElement(elementData);
//   // }, [elementData]);

//   function toggleChecked(e) {
//     e.target.checked = !e.target.checked;
//     console.log(e.target.checked);
//   }
    
//   function handleAddTask(taskValue) {
//    updateElement({
//      ...todoElementData,
//      tasks: [
//        ...todoElementData.tasks,
//        {
//          taskName: taskValue,
//          isCompleted: false,
//          id: nanoid(),
//          order: todoElementData.tasks.length
//        }
//      ]
//    }) 
//   }

//   function handleUpdateTask(taskValue, taskId) {
//     try {
//       updateElement({
//         ...todoElementData,
//         tasks: todoElementData.tasks.map(task => {
//             if (task.id === taskId) {
//               return {
//                 ...task,
//                 taskName: taskValue,
  
//               }
//             } else {
//               return task;
//             }
//           })
//       })
//     } catch(error) {
//       console.error(error);
//     }

//   }

//   function handleUpdateTaskName(todoNameValue) {
//     try {
//       updateElement({
//         ...todoElementData,
//         name: todoNameValue
//       })
//     } catch(err) {
//       console.error(err);
//     }
//   }

//   // DRY THIS FUNCTION LATER
//   function handleRemoveTask(taskId, orderNumber) {
//     updateElement({
//       ...todoElementData,
//       tasks: [...todoElementData.tasks.filter(task => task.id != taskId).map((taskE) => {
//         if (taskE.order > orderNumber) {
//           return {
//             ...taskE,
//             order: --taskE.order,
//           }
//         } else {
//           return taskE;
//         }
//       })],
//     });
//   }

//   function handleChangeCheckbox(taskId) {
//     updateElement({
//       ...todoElementData,
//       tasks: [...todoElementData.tasks.map(task => {
//         if (task.id === taskId) {
//           return {
//             ...task,
//             isCompleted: !task.isCompleted,
//           }
//         } else {
//           return task;
//         }
//       })]
//     })
//   }



//   function dragStartHandler(e, task) {
//     //e.stopPropagation();
//     console.log('drag', task)
//     currentTask.current = task;
//   }

//   function dragEndHandler(e) {

//   }

//   function dragOverHandler(e) {
//     e.preventDefault();

//   }

//   function dropHandler(e, targetTask) {
//     e.preventDefault();
//     console.log('drop', targetTask);
//     const draggedTask = currentTask.current;
  
//     if (!draggedTask || draggedTask.id === targetTask.id) return;
  
//     const updatedTasks = todoElementData.tasks.map(task => {
//       if (task.id === draggedTask.id) {
//         return { ...task, order: targetTask.order };
//       }
//       if (task.id === targetTask.id) {
//         return { ...task, order: draggedTask.order };
//       }
//       return task;
//     });

//     console.log(updatedTasks);
    
//     updateElement({
//       ...todoElementData,
//       tasks: updatedTasks,
//     });

//     //console.log(todoElementData);



    
    
//   }



//   return (
//     <div className={styles.wrapper} 
//     >
//     <div className="todo-element" key={todoElementData.id}>
//      <div className={clsx('name',
//       todoElementData.isCompleted && 'text-completed')}>
//      <input className='todo-item-checkbox' type="checkbox" defaultChecked={todoElementData.isCompleted} onClick={(e) => {
//       //console.log(`Item:id: ${todoElementData.id}`);
//       handleCheckElement(todoElementData.id);
//      }}/>
//      <TodoName todoName={todoElementData.name} updateName={handleUpdateTaskName}/>
//      <button onClick={(e) => {
//       e.preventDefault();
//       console.log(`Item:id: ${todoElementData.id}`);
//       handleDeleteElement(todoElementData.id, todoElementData.order);
//      }}>Del</button>
//      </div>
//      <div className='item-scroll'>
//      <div className="todo-tasks">
//      {todoElementData.tasks.sort(sortTasks).map(task => (
//       <div key={task.id}
//       draggable={true}
//         onDragStart={(e) => {
//           dragStartHandler(e, task);

//         }}
//         onDragEnd={(e) => {
//           dragEndHandler(e);
          

//         }}
        
//         onDragLeave={(e) => {
//           dragEndHandler(e);

//         }}
        
//         onDragOver={(e) => {
//           dragOverHandler(e);

//         }}
//         onDrop={(e) => {
//           dropHandler(e, task);

//         }}
//       >
//       <TodoTask task={task} todoElementData={todoElementData} handleChangeCheckbox={handleChangeCheckbox} handleRemoveTask={handleRemoveTask} updateTask={handleUpdateTask}/>
//       </div>
//     //  <div className="task" key={`${task.id}-${todoElementData.id}`}>
//     //    <input type="checkbox" defaultChecked={task.isCompleted} onClick={(e) => {
//     //     handleChangeCheckbox(task.id);
//     //   }}/>
//     //   <p className={clsx('',
//     //   task.isCompleted && 'text-completed')}>{task.taskName}</p>
//     //   <button onClick={(e) => {
//     //     e.preventDefault();
//     //     handleRemoveTask(task.id);
//     //   }}>Del</button>

//     //  </div>
//      ))}
//      </div>
//      </div>
//      <div className="task-add">
//      <form onSubmit={(e) => {
//        e.preventDefault();
//        handleAddTask(e.target.taskName.value);
//        e.target.taskName.value = "";
//      }}>
//      <input type="text" name="taskName"/>
//      <button className='add-task-button' type="submit">+</button>
//      </form>
//      </div>
//     </div>
//     </div>
//   )
// }
