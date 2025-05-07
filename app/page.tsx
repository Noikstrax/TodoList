'use client';
import TodoElement from './src/components/TodoElement';
import { useState } from 'react';
import TodoAddElement from '@/app/src/todoAddElement/TodoAddElement';
import { useEffect, useReducer, useCallback } from 'react';

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
| {type: 'GET_TODOS'; payload: TodoItem[]}
| {type: 'ADD_TODO'; payload: TodoItem }
| {type: 'UPDATE_TODOS'; payload: {itemId: string, newTodoItem: TodoItem}}
| {type: 'HANDLE_CHECK_TODO'; payload: {elementId: string}}
| {type: 'HANDLE_DELETE_TODO'; payload: {elementId: string, orderNumber: number}}
| {type: 'DROP_HANDLER'; payload: {todoItem: TodoItem, currentTodoItem: TodoItem}};

type TodoState = TodoItem[];

function setTodoListInLocalStorage(todoList: TodoState) {
  try {
    const json = JSON.stringify(todoList);
    localStorage.setItem('todoList', json);
  } catch(err) {
    console.error('Set localStorage error:', err);
  }
  
}

function todoElementsReducer(state: TodoState, action: Action): TodoState {
  switch(action.type) {
    case 'GET_TODOS':
      return action.payload;
    case 'ADD_TODO':
      const addTodoState = [...state, action.payload];
      setTodoListInLocalStorage(addTodoState);
      return addTodoState;
    case 'UPDATE_TODOS':
      const updateTodoState = state.map(todoItem => {
        if (action.payload.itemId === todoItem.id) {
          return action.payload.newTodoItem;
        } else {
          return todoItem;
        }
      });
      setTodoListInLocalStorage(updateTodoState);
      return updateTodoState;
    case 'HANDLE_CHECK_TODO':
      const checkTodoState = state.map(todoItem => {
        if (todoItem.id === action.payload.elementId) {
          return {
            ...todoItem,
            isCompleted: !todoItem.isCompleted,
          }
        } else {
          return todoItem;
        }
      });
      setTodoListInLocalStorage(checkTodoState);
      return checkTodoState;
    case 'HANDLE_DELETE_TODO':
      const handleDeleteState = state.filter((todoElement: TodoItem) => todoElement.id !== action.payload.elementId).map((todoElem: TodoItem) => {
        if (todoElem.order > action.payload.orderNumber) {
          return {
            ...todoElem,
            order: --todoElem.order,
          }
        } else {
          return todoElem;
        }
      });
      setTodoListInLocalStorage(handleDeleteState);
      return handleDeleteState;

    case 'DROP_HANDLER':
      const { todoItem, currentTodoItem } = action.payload;

      const targetOrder = todoItem.order;
      const sourceOrder = currentTodoItem.order;
      let tempState = state;
      tempState = tempState.map(item => {
        if (item.id === todoItem.id) {
          return { ...item, order: sourceOrder };
        }
        if (item.id === currentTodoItem.id) {
          return { ...item, order: targetOrder };
        }
        return item;
      });
      setTodoListInLocalStorage(tempState);
      return tempState;

      
  }

}
export default function Home() {

  const [todoData, dispatch] = useReducer(todoElementsReducer, []);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentTodoItem, setCurrentTodoItem] = useState<TodoItem | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('todoList');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        dispatch({type: 'GET_TODOS', payload: parsedData})
      } catch (e) {
        console.error(e);
      }
    }
    setIsInitialized(true);
  }, [])


  function addTodoElement(item: TodoItem): void {
    dispatch({type: 'ADD_TODO', payload: item})
  }

  function setDataInLocalStorage(newState: TodoState) {
    localStorage.setItem('todoList', JSON.stringify(newState));
  }


  const updateTodoItems = useCallback((itemId: string, newTodoItem: TodoItem): void => {
    if (!isInitialized) return;
    dispatch({type: 'UPDATE_TODOS', payload: {itemId, newTodoItem}});
  }, [dispatch, isInitialized]);

function handleCheckElement(elementId: string) {
  dispatch({type: 'HANDLE_CHECK_TODO', payload: {elementId}}); 
}

function updateTodoTask(elementId: string, todoTaskId: string): void {
  
}

function handleDeleteTask(taskId: string): void {
  

}

function handleDeleteElement(elementId: string, orderNumber: number): void {
  dispatch({type: 'HANDLE_DELETE_TODO', payload: {elementId, orderNumber}});
};


function dragStartHandler(e: React.DragEvent, todoItem: TodoItem): void {
  setCurrentTodoItem(todoItem);
}

function dragEndHandler(e: React.DragEvent): void {

}

function dragOverHandler(e: React.DragEvent): void {
  e.preventDefault();

}

function dropHandler(e: React.DragEvent, todoItem: TodoItem): void {
  e.preventDefault();
  try {
  if (currentTodoItem !== null) {
    dispatch({type: 'DROP_HANDLER', payload: {todoItem, currentTodoItem}});
  }
  } catch(err) {
    console.error(err);
  }
}


const sortTodoItems = (a: TodoItem, b: TodoItem) => {
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
