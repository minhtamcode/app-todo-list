import Button from "@atlaskit/button";
import React from "react";
import styled, { css } from "styled-components";
import CheckIcon from "@atlaskit/icon/glyph/check";
import EditorCodeIcon from '@atlaskit/icon/glyph/editor/code';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import Textfield from "@atlaskit/textfield";
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';


const ButtonStyled = styled(Button)
`
  text-align: left;
  .task-edit {
      width: calc(100% - 200px);
      position: absolute;
      top: 20px;
  }
  .list-task {
      width: 100%;
      border: none;
      border-bottom: 1px dashed;
      border-radius: 0;
      padding:0;
      float: left;
      font-size: 20px;
      font-family: "Mulish",sans-serif;
  }

  ${(p) => p.isEdited ? css`
      .task-edit{
          display: none;
          opacity: 0;
      }
    `: css`
      .task-title{
        display: none;
        opacity:0;
    }
      `}


  &,
  &:hover {
    ${(p) =>
      p.isCompleted &&
      css`
      .task-title{
        text-decoration: line-through;
      }
      .check-icon{
        box-shadow: inset 0 0 0 2px #4fff4f;
      }
      `}
  }
  .check-icon{
      span {
        svg {
            opacity: 1;
            width: 38px;
            height: 38px;
            transition: 0.5s;
        }
    }
    transition: transform 1s;
  }




  &:hover {
    .check-icon {
      display: inline-block;
      ${(p) =>
        p.isCompleted ?
        css`
            &:hover {
              background-color: #fff;
              border-radius: 50%;
              display: inline-block;
              box-shadow: inset 0 0 0 2px #FF0000;
              span {color: #fff;}
              text-decoration: none;
              -webkit-transition: background 0.1s ease-out,box-shadow 0.15s cubic-bezier(0.47,0.03,0.49,1.38);
              // transition: background 0.1s ease-out,box-shadow 0.15s cubic-bezier(0.47,0.03,0.49,1.38);
              white-space: nowrap;
              background: #fff;
              color: #FF0000 !important;
              .close-icon {opacity: 1;}
              span {
                svg {
                    display:block;
                    opacity: 1;
                    width: 38px;
                    height: 38px;
                    color: #FF0000 !important;
                }
            }
        }
          ` : css`
              &:hover {
                background-color: #fff;
                border-radius: 50%;
                display: inline-block;
                box-shadow: inset 0 0 0 2px #4fff4f;
                  span {color: #fff;}
                text-decoration: none;
                -webkit-transition: background 0.1s ease-out,box-shadow 0.15s cubic-bezier(0.47,0.03,0.49,1.38);
                // transition: background 0.1s ease-out,box-shadow 0.15s cubic-bezier(0.47,0.03,0.49,1.38);
                white-space: nowrap;
                background: #fff;
                color: #4fff4f !important;
                .close-icon {opacity: 1;}
                span {
                  svg {
                      opacity: 1;
                      width: 38px;
                      height: 38px;
                      color: #4fff4f !important;
                  }
                }
            }
        `}
    }
  }
`;

export default function Todo({ todo, onCheckBtnClick, onRemoveBtnClick, onUnCheckBtnClick, onTaskChange, onInputCompleted,onInputStartEditor }) {
  return (
      <>
        <ButtonStyled 
            // shouldFitContainer
            className="task"
            isCompleted={todo.isCompleted}
            isEdited={todo.isEdited}
            iconBefore={
              !todo.isCompleted ? (
                <span className='check-icon' onClick={() => onCheckBtnClick(todo.id)}>
                </span>
              ) : (<span className='check-icon' onClick={() => onUnCheckBtnClick(todo.id)}>
                <CheckIcon primaryColor='#4fff4f' />
                   </span>)
            }
            iconAfter={
              <div className='last-icon'>
                <span className='remove-icon' onClick={() => onRemoveBtnClick(todo.id)}>
                  <EditorCloseIcon primaryColor='#000' />
                </span>
                <span className='move-icon'>
                  <EditorCodeIcon primaryColor='#000' />
                </span>
              </div>
            }>
          <div className='task-edit'>
            <Textfield 
              placeholder = "neue Aufgabe..."
              className='list-task'
              value = { todo.name }
              onChange = {(e) => onTaskChange(todo.id, e.target.value)}
              />
              <span className='done-icon' onClick={() => onInputCompleted(todo.id)}>
                  <EditorDoneIcon primaryColor='#fff' />
              </span>    
          </div>
                <span className='task-title' onClick={() => onInputStartEditor(todo.id)}>
                  { todo.name }
                </span>
      </ButtonStyled>
    </>
    
  );
}

