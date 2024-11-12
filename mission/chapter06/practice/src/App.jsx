import { useContext } from 'react';
import './App.css'
import CustomButton from './component/CustomButton';
import CustomInput from './component/CustomInput';
import { useState } from 'react';
import { TodoContext } from './context/TodoContext';

function App() {
  const {
    todos,text,setText,editingId,setEditingId,editText,setEditText,
        handleSubmit,addTodo,deleteTodo,updateTodo,
  } = useContext(TodoContext)

  return (
     <>
      <form onSubmit={handleSubmit}>
        <CustomInput typingText = {text} func = {setText}/>
        <CustomButton text = "할 일 등록" func={()=>addTodo()}/>
      </form>
      <div>
        {todos.map((todo, _) => (
          <div style={{display : 'flex', gap: '20px'}}> 
          {/*수정중이 아닐때 */}
          {todo.id !== editingId && (
           <div key={todo.id} style={{display: 'flex', gap: '5px'}}> 
            <p>{todo.id}번</p>
            <p>{todo.task}</p>
           </div>
          )}
          {/*수정중 일때 */}
          {todo.id === editingId && (
            <div key={todo.id} style={{display: 'flex', gap: '5px'}}> 
              <p>{todo.id}번</p>
              <CustomInput defaultValue={todo.task} func ={setEditText}/>
            </div>
          )}
          
        <CustomButton text = "삭제하기" func={()=>deleteTodo(todo.id)}/>
        {editingId === todo.id ?
        (<CustomButton text = "수정 완료" func={()=>updateTodo(editingId,editText)}/>)
         : (<CustomButton text = "수정 진행" func={()=>setEditingId(todo.id)}/>) }
        
      </div>
        ))
      }
      </div>
     </>
  )
}

export default App
