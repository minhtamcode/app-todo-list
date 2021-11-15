import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useState, useEffect } from "react";
import { v4 } from "uuid";

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
        { id: v4(), name: '', isGroup: true, isCompleted: false ,isEdited: false},
      ]);
    },
    [todoList]
  );

  const onAddBtnClickItem = useCallback(
    (e) => {
      // them text input vao cuoi danh sach todoList
      setTodoList([
        ...todoList,
        { id: v4(), name: '', isItem: true, isCompleted: false ,isEdited: false},
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

  return (
    <>
    <div className="checklist">
    <div className="checklist-editor">
    <h2>Checkliste Hochzeit</h2>
      <div className="checklist-content">
      {/* <Textfield
        name='add-todo'
        placeholder='Thêm việc cần làm...'
        elemAfterInput={
          <Button
            isDisabled={!textInput}
            appearance='danger'
            onClick={onAddBtnClick}
          >
            Thêm
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield> */}
      <TodoList todoList={todoList} 
      onCheckBtnClick={onCheckBtnClick} 
      onRemoveBtnClick={onRemoveBtnClick} 
      onUnCheckBtnClick={onUnCheckBtnClick} 
      onInputCompleted={onInputCompleted} 
      onInputStartEditor={onInputStartEditor}
      onTaskChange={onTaskChange}/>
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
