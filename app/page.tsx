'use client';
import Image from "next/image";
import styles from "./page.module.css";
import TodoElement from '@/app/src/TodoElement/TodoElement';
import { useState } from 'react';
import TodoAddElement from '@/app/src/todoAddElement/TodoAddElement';

const todoDataTest = [
  {
  id: '0ad21312gsfdd',
  name: 'Приготовить гречку',
  isCompleted: false,
  tasks: [
    {taskName: 'Взять кастрюлу', isCompleted: false, id: 0},
    {taskName: 'Налить воды', isCompleted: false, id: 1},
    {taskName: 'Засыпать гречку', isCompleted: false, id: 2},
    {taskName: 'Варить 15 минут', isCompleted: true, id: 3},
    ],
  },
  {
  id: '2131adeaba',
  name: 'Приготовить гречку',
  isCompleted: false,
  tasks: [
    {taskName: 'Взять кастрюлу', isCompleted: false, id: 0},
    {taskName: 'Налить воды', isCompleted: false, id: 1},
    {taskName: 'Засыпать гречку', isCompleted: false, id: 2},
    {taskName: 'Варить 20 минут', isCompleted: true, id: 3},
    ],
  },
];

export default function Home() {
  const [todoData, setTodoData] = useState(todoDataTest);
  console.log(todoData);
  function addTodoElement(item) {
    setTodoData([...todoData, item]);
  }
  return (
    <div className="grid">
      {todoData.map(todoItem => (
        <TodoElement elementData={todoItem} key={todoItem.id} />
      ))}
      <TodoAddElement todoAddFunction={addTodoElement} />

    </div>
  );
}
