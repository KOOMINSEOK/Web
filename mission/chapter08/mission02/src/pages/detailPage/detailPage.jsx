import { useParams } from "react-router-dom";
import todoMutation from "../../apis/todoMutation";
import * as S from './styled/styled.js';
import { useState } from "react";
import { Link } from "react-router-dom";

const DetailPage = ()=>{
    const {todoId} = useParams();
    const {useTodoQuery, patchTodoMutation,deleteTodoMutation} = todoMutation();
    const {data: todo, isPending} = useTodoQuery(todoId);
    
    const [IsEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    
    const onClickHandler = () =>{
        patchTodoMutation({id: todo.id,
            title: (editTitle=== "" ? todo.title : editTitle),
            content : (editContent=== "" ? todo.content : editContent)});
        setEditContent("");
        setEditTitle("");
        setIsEditing(false)
    }
    return(
        <S.Container>  
            <S.IdContainer>
                <p>id : {todo?.id}</p>
            </S.IdContainer>
            {IsEditing ?
                <>
                    <div>
                        <p>제목 : </p>
                        <input type="text"
                            defaultValue = {todo.title}
                            onChange={(e)=>{setEditTitle(e.target.value)}}/>
                    </div>
                    <div>
                        <p>내용 : </p>
                        <input type="text"
                            defaultValue={todo.content}
                            onChange={(e)=>setEditContent(e.target.value)}/>
                    </div>
                </>
            :
                <S.ContentContainer>
                    <p>제목 : {todo?.title}</p>
                    <p>내용 : {todo?.content}</p>
                    <p>날짜 : {todo?.createdAt}</p>
                    <p>상태: {todo?.checked ? "완료" : "미완료"}</p>
                </S.ContentContainer>
            }
            
            <S.ButtonContainer>
                {IsEditing ?
                    <S.Button onClick={onClickHandler}>수정 완료</S.Button>
                :
                    <>
                        <S.Button onClick = {()=>setIsEditing(true)}>수정하기</S.Button>
                        <Link to={`/`}>
                            <S.Button onClick={()=>deleteTodoMutation({id : todoId})}>삭제</S.Button>
                        </Link>
                    </>
                }
            </S.ButtonContainer>
        </S.Container>
    )   
}

export default DetailPage;