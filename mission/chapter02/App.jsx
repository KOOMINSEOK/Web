import './App.css'
import CustomButton from './component/CustomButton';

import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([{ id: 1, task : '투두 만들어 보기'}]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editText, setEditText] = useState('');
  
  const handleSubmit = (e)=>{
    e.preventDefault();
  }


  //1.추가하기
  const addTodo = () => {
    setTodos( (prev) => [
      ...prev,
      { id: Math.floor(Math.random()*100)+2, task : text}
    ])
    setText('');
  };
  //2.삭제하기
  const deleteTodo = (id) => {
    setTodos((prev)=> prev.filter((item) => item.id !== id));
  };
  //3.수정하기
  const updateTodo = (id,text) =>{
    setTodos((prev)=> prev.map((item) => (item.id === id ?{...item, task : text} : item)))
    setEditingId('');
  }
  return (
     <>
      <form onSubmit={handleSubmit}>
        <input
         type='text'
         value = {text}
         onChange={(e)=>{setText(e.target.value);}}
        />
       <CustomButton text = "할 일 등록" func={addTodo}/>
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
              <input defaultValue={todo.task} onChange={(e)=>{setEditText(e.target.value)}}/>
            </div>
          )}
          
        <CustomButton text = "삭제하기" func={deleteTodo} id = {todo.id}/>
        {editingId === todo.id ?
        (<CustomButton text = "수정 진행" func={updateTodo} id = {editingId} editText = {editText}/>)
         : (<CustomButton text = "수정 진행" func={setEditingId} id = {todo.id}/>) }
        
      </div>
        ))
      }
      </div>
     </>
  )
}

export default App
