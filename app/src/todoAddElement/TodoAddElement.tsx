'use client';
import { nanoid } from 'nanoid';



// DRY!!!!!
type SubTask = {
  id: string,
  taskName: string,
  isCompleted: boolean,
  order: number
}

type TodoItem = {
  id: string,
  name: string,
  isCompleted: boolean,
  tasks: SubTask[],
  order: number;
}

type TodoAddFunction = (item: TodoItem) => void;

interface TodoAddElementProps {
  todoAddFunction: TodoAddFunction;
  orderNumber: number;
}


export default function TodoAddElement({todoAddFunction, orderNumber}: TodoAddElementProps) {
  return (
    <div className="todo-add">
      <form onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const taskName = target.elements.namedItem('newTaskName') as HTMLInputElement;
        let todoItem = {
         id: nanoid(),
         name: taskName.value,
         isCompleted: false,
         tasks: [],
         order: orderNumber
        };
        if (todoItem.name !== "") {
          todoAddFunction(todoItem);
          taskName.value = '';
        } else {
          console.error('Input name');
        }
      }}>
      <input type="text" name="newTaskName" />
      <button className='add-todo-button' type="submit">+</button>
      </form>
    </div>
  )
}
