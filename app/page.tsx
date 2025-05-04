'use client';
import TodoElement from './src/components/TodoElement';
import { useState } from 'react';
import TodoAddElement from '@/app/src/todoAddElement/TodoAddElement';
import { useEffect, useReducer, useCallback } from 'react';

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

type Action =
| {type: 'SET_TODOS'; payload: TodoItem[]}
| {type: 'ADD_TODO'; payload: TodoItem }
| {type: 'UPDATE_TODOS'; payload: {itemId: string, newTodoItem: TodoItem}}
| {type: 'HANDLE_CHECK_TODO'; payload: {elementId: string}}
| {type: 'HANDLE_DELETE_TODO', payload: {elementId: string, orderNumber: number}};

type TodoState = TodoItem[];

function todoElementsReducer(state: TodoState, action: Action): TodoState {
  switch(action.type) {
    case 'SET_TODOS':
      return action.payload;
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'UPDATE_TODOS':
      return state.map(todoItem => {
        if (action.payload.itemId === todoItem.id) {
          return action.payload.newTodoItem;
        } else {
          return todoItem;
        }
      })
    case 'HANDLE_CHECK_TODO':
      return state.map(todoItem => {
        if (todoItem.id === action.payload.elementId) {
          return {
            ...todoItem,
            isCompleted: !todoItem.isCompleted,
          }
        } else {
          return todoItem;
        }

      });
      
  }

}
export default function Home() {

  //const [todoData, setTodoData] = useState(todoDataTest);
  //const [todoData, setTodoData] = useState([]);
  const [todoData, dispatch] = useReducer(todoElementsReducer, []);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentTodoItem, setCurrentTodoItem] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('todoList');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        dispatch({type: 'SET_TODOS', payload: parsedData})
      } catch (e) {
        console.error(e);
      }
    }
    setIsInitialized(true);

  }, [])

  useEffect(() => {
    setDataInLocalStorage(todoData);
  }, [todoData])


  function addTodoElement(item: TodoItem): void {
    dispatch({type: 'ADD_TODO', payload: item})
  }

  function setDataInLocalStorage(data12) {
    localStorage.setItem('todoList', JSON.stringify(data12));
  }


  const updateTodoItems = useCallback((itemId: string, newTodoItem: TodoItem): void => {
    if (!isInitialized) return;
    dispatch({type: 'UPDATE_TODOS', payload: {itemId, newTodoItem}});
  }, [dispatch, isInitialized]);

function handleCheckElement(elementId: string) {
  dispatch({type: 'HANDLE_CHECK_TODO', payload: {elementId}});
  
  // setTodoData(todoData.map(todoElement => {
  //   if (todoElement.id === elementId) {
  //     return {
  //       ...todoElement,
  //       isCompleted: !todoElement.isCompleted,
  //     }
  //   } else {
  //     return todoElement;
  //   }
  // }))
}

function updateTodoTask(elementId, todoTaskId) {
  
}

function handleDeleteTask(taskId: string): void {
  

}

function handleDeleteElement(elementId: string, orderNumber: number): void {
  setTodoData(todoData.filter((todoElement: TodoItem) => todoElement.id !== elementId).map((todoElem: TodoItem) => {
    if (todoElem.order > orderNumber) {
      return {
        ...todoElem,
        order: --todoElem.order,
      }
    } else {
      return todoElem;
    }
  }));
};


function dragStartHandler(e, todoItem) {
  //console.log('drag', todoItem)

}

function dragEndHandler(e) {

}

function dragOverHandler(e) {
  e.preventDefault();

}

function dropHandler(e, todoItem) {
  e.preventDefault();
  //console.log('drop', todoItem)
  try {
  setTodoData(todoData.map((item) => {
    if (item.id === todoItem.id) {
      return {
        ...item,
        order: currentTodoItem.order,
      }
    }
    if (item.id === currentTodoItem.id) {
      return {
        ...item,
        order: todoItem.order,
      }
    }
    return item;       
  }))
 // console.log(todoData);
  } catch(err) {
    console.error(err);
  }
}


const sortTodoItems = (a, b) => {
  if (a.order > b.order) {
    return 1;
  } else {
    return -1;
  }

}

  return (
    <div className="grid">
      {todoData.sort(sortTodoItems).map(todoItem => (
        <div key={todoItem.id}
        draggable={true}
        onDragStart={(e) => {
          dragStartHandler(e, todoItem);
          setCurrentTodoItem(todoItem);

        }}
        onDragEnd={(e) => {
          dragEndHandler(e);
          

        }}
        
        onDragLeave={(e) => {
          dragEndHandler(e);

        }}
        
        onDragOver={(e) => {
          dragOverHandler(e);

        }}
        onDrop={(e) => {
          dropHandler(e, todoItem);

        }}>
        <TodoElement todoItem={todoItem} updateTodoItems={updateTodoItems} handleDeleteElement={handleDeleteElement} handleCheckElement={handleCheckElement}/>
        </div>
      ))}
      <TodoAddElement todoAddFunction={addTodoElement} orderNumber={todoData.length}/>

    </div>
  );
}
