'use client';
import TodoElement from '@/app/src/TodoElement/TodoElement';
import { useState } from 'react';
import TodoAddElement from '@/app/src/todoAddElement/TodoAddElement';
import { useEffect } from 'react';

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

  //const [todoData, setTodoData] = useState(todoDataTest);
  const [todoData, setTodoData] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentTodoItem, setCurrentTodoItem] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('todoList');
    if (storedData) {
      try {
        setTodoData(JSON.parse(storedData));
      } catch (e) {
        console.error(e);
      }
    }
    setIsInitialized(true);

  }, [])

  useEffect(() => {
    setDataInLocalStorage(todoData);
  }, [todoData])


  function addTodoElement(item) {
    setTodoData([...todoData, item]);
  }

  function setDataInLocalStorage(data12) {
    localStorage.setItem('todoList', JSON.stringify(data12));
  }

  function updateTodoItems(itemId, newTodoItem) {
    if (!isInitialized) return;
    setTodoData(todoData.map(todoItem => {
      if (itemId === todoItem.id) {
        return newTodoItem;
      } else {
        return todoItem;
      }
    }));
  }

function handleCheckElement(elementId) {
  setTodoData(todoData.map(todoElement => {
    if (todoElement.id === elementId) {
      // const updatedElement = {
      //   ...todoElement,
      //   isCompleted: !todoElement.isCompleted,
      // };
      // console.log("Updated element:", updatedElement); // Проверяем новое значение
      // return updatedElement;
      return {
        ...todoElement,
        isCompleted: !todoElement.isCompleted,
      }
    } else {
      return todoElement;
    }
  }))
}

function updateTodoTask(elementId, todoTaskId) {
  
}

function handleDeleteTask(taskId: string): void {
  

}

function handleDeleteElement(elementId, orderNumber) {
  setTodoData(todoData.filter(todoElement => todoElement.id !== elementId).map((todoElem) => {
    if (todoElem.order > orderNumber) {
      return {
        ...todoElem,
        order: --todoElem.order,
      }
    } else {
      return todoElem;
    }
  }));
  // setTodoData(todoData.map((todoElement) => {
  //   if (todoElement.order < orderNumber) {
  //     return todoElement;
  //   } else if (todoElement.order > orderNumber) {
  //     return {
  //       ...todoElement,
  //       order: todoElement.order--
  //     }
  //   }
  // }))
};


function dragStartHandler(e, todoItem) {
  console.log('drag', todoItem)

}

function dragEndHandler(e) {

}

function dragOverHandler(e) {
  e.preventDefault();

}

function dropHandler(e, todoItem) {
  e.preventDefault();
  console.log('drop', todoItem)
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
  }))
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
        <TodoElement elementData={todoItem} id={todoItem.id} updateTodoItems={updateTodoItems} handleDeleteElement={handleDeleteElement} handleCheckElement={handleCheckElement}/>
        </div>
      ))}
      <TodoAddElement todoAddFunction={addTodoElement} orderNumber={todoData.length}/>

    </div>
  );
}
