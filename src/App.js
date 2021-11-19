import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useState, useEffect } from "react";
import { v4 } from "uuid";
import { ReactComponent as Hamburger } from "./hamburger.svg";

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [todoList, setTodoList] = useState([]);


  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);



  const onAddBtnClickGroup = useCallback(
    (e) => {
      // them text input vao danh sach todoList
      setTodoList([
        ...todoList,
        { id: v4(), name: 'Überschrift...', isGroup: true, isCompleted: false ,isEdited: false},
      ]);
    },
    [todoList]
  );

  const onAddBtnClickItem = useCallback(
    (e) => {
      // them text input vao cuoi danh sach todoList
      setTodoList([
        ...todoList,
        { id: v4(), name: 'neue Aufgabe...', isItem: true, isCompleted: false ,isEdited: false},
        ]);
    },
    [todoList]
  );

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true} : todo
      )
    );
  }, []);

  const onUnCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: false} : todo
      )
    );
  }, []);

  const onRemoveBtnClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.filter((todo) =>
        todo.id !== id 
      )
    );
  }, []);

  const onInputCompleted = useCallback((id) => {
      setTodoList(prevState => prevState.map(todo => todo.id === id && todo.name !== '' ? { ...todo, isEdited: true} : todo))
      // console.log(1)
  }, []);


  const onInputStartEditor = useCallback((id) => {
    setTodoList(prevState => prevState.map(todo => todo.id === id ? {...todo, isEdited: false } : todo))
    // console.log(1)
  }, []);

  
  const onTaskChange = useCallback((id, name) => {
      // console.log(1)
      setTodoList(prevState => prevState.map(todo => todo.id === id ? {...todo, name:name } : todo))
  });

  const onDragStart = useState((e, index) => {
    const draggedItem = [];
    draggedItem = todoList[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  });

  const onDragOver  = useState((e, index) => {
    e.preventDefault();
    const draggedOverItem = todoList[index];

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let todoList = todoList.filter(todo => todo !== this.draggedItem);

    // add the dragged item after the dragged over item
    todoList.splice(index, 0, this.draggedItem);

    this.setState({ todoList });
  });

  const onDragEnd = () => {
    this.draggedItem = null;
  };

  return (
    <>
    <div className="checklist">
    <div className="checklist-editor">
    <h2>Checkliste Hochzeit</h2>
      <div className="checklist-content">
      <ul onDragOver={(e) => e.preventDefault}>
            {this.state.todoList.map((todo, idx) => (
              <li key={todo} onDragOver={(e) => this.onDragOver(e, idx)}>
                <TodoList todoList={todoList} 
                onCheckBtnClick={onCheckBtnClick} 
                onRemoveBtnClick={onRemoveBtnClick} 
                onUnCheckBtnClick={onUnCheckBtnClick} 
                onInputCompleted={onInputCompleted} 
                onInputStartEditor={onInputStartEditor}
                onTaskChange={onTaskChange}
                draggable
                onDragStart={e => this.onDragStart(e, idx)}
                onDragEnd={this.onDragEnd}/>
                <Hamburger />              
                <span className="content">{todo}</span>
              </li>
            ))}
          </ul>
    </div>
    <div className="controls">
      <Button
        style={{ backgroundColor: '#60B987' }}
        onClick={onAddBtnClickItem}
        className="add-item">+
      </Button>
      <div className="add-group" onClick={onAddBtnClickGroup}>
        <i className="tool-plus-button">+</i>
        neue Überschrift
      </div>
    </div>
    </div>
    <div class="save-new-checklist">
      <a class="button checklist-save-button">
      Checkliste speichern
      </a>
    </div>
    </div>
    </>
  );
}

export default App;
