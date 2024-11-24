import { useState } from 'react';
import * as S from './styled/styled.js';
import { Link } from 'react-router-dom';
const TodoItem = ({todo, deleteTodoMutation, patchTodoMutation})=>{
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    return(
        <S.TodoContainer key = {todo.id}>
            <S.ContentContainer>
                <S.Checkbox 
                    type='checkbox'
                    defaultChecked={todo.checked} 
                    onClick={()=>patchTodoMutation({id : todo.id , checked : !todo.checked})}/>
                {isEditing ?
                    <S.TextContainer>
                        <S.EditInput 
                            defaultValue = {todo.title}
                            onChange={(e)=>{setEditTitle(e.target.value)}}/>
                        <S.EditInput
                            defaultValue={todo.content}
                            onChange={(e)=>setEditContent(e.target.value)}/> 
                    </S.TextContainer>
                    :
                    <Link to={`../details/${todo.id}`}>
                        <S.TextContainer>   
                            <S.Text>제목 : {todo.title}</S.Text>
                            <S.Text>내용 : {todo.content}</S.Text>
                        </S.TextContainer>
                    </Link>
                }
                
            </S.ContentContainer>
            {isEditing ?
                <S.Button 
                    onClick={()=>{
                        patchTodoMutation({id: todo.id,
                                            title: (editTitle=== "" ? todo.title : editTitle),
                                            content : (editContent=== "" ? todo.content : editContent)});
                        setEditContent("");
                        setEditTitle("");
                        setIsEditing(false)}}
                    >수정완료</S.Button> 
                :<div>
                    <S.Button onClick={()=>setIsEditing(true)}>수정</S.Button>
                    <S.Button onClick={()=>deleteTodoMutation({id : todo.id})}>삭제</S.Button>
                </div>
            }
            
        </S.TodoContainer>
    )
}
export default TodoItem;