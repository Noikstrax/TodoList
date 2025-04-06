'use client';
import { nanoid } from 'nanoid';

export default function TodoAddElement({todoAddFunction}) {
  return (
    <div className="todo-add">
      <form onSubmit={(e) => {
        e.preventDefault();
        let todoItem = {
         id: nanoid(),
         name: e.target.newTaskName.value,
         isCompleted: false,
         tasks: [],
        };
        if (todoItem.name !== "") {
          todoAddFunction(todoItem);
          e.target.newTaskName.value = '';
        } else {
          console.error('Input name');
        }
      }}>
      <input type="text" name="newTaskName" />
      <button type="submit">+</button>
      </form>
    </div>
  )
}
