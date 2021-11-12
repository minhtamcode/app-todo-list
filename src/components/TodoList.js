import React from "react";
import Todo from "./Todo";

export default function TodoList({ todoList, onCheckBtnClick, onRemoveBtnClick, onUnCheckBtnClick, onTaskChange, onInputCompleted,onInputStartEditor}) {
  return (
    <>
    {todoList.map((todo) => (
        <Todo key={todo.id} 
        todo={todo} 
        onCheckBtnClick={onCheckBtnClick} 
        onRemoveBtnClick={onRemoveBtnClick} 
        onUnCheckBtnClick={onUnCheckBtnClick} 
        onTaskChange={onTaskChange} 
        onInputCompleted={onInputCompleted} 
        onInputStartEditor={onInputStartEditor}/>
      ))}
    </>
  );
}
