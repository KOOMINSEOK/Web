import { useState } from "react"
import * as S from "./styled/styled";
import TodoItem from "../../component/todoBox/todoItem";
import todoMutation from '../../apis/todoMutation.js';
import {SyncLoader} from 'react-spinners'
import useDebounce from "../../hooks/useDebounce.js";
const MainPage = ()=>{
    const [title, setTitle] = useState("");
    const [content,setContent] = useState("");
    const [search, setSearch] = useState("");

    const { useTodoListQuery, postTodoMutation, deleteTodoMutation, patchTodoMutation } = todoMutation();
    const debouncedValue = useDebounce(search,300)
    const {data: todos, isPending, isError} = useTodoListQuery(debouncedValue);

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(title,content);
        postTodoMutation({title,content});
        setTitle("");
        setContent("");
        
    }
    const isDisabled = (title === "" || content === ""); 

    return(
        <S.Container>
            <S.Form onSubmit={handleSubmit}>
                <S.Input 
                    name="title"
                    placeholder="제목을 입력해주세요"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}/>
                <S.Input 
                    name= "content" 
                    placeholder="컨텐츠를 입력해주세요"
                    value={content} 
                    onChange={(e)=>setContent(e.target.value)}/>
                <S.Button type="submit" disabled={isDisabled}>ToDo 생성</S.Button>
            </S.Form>
            <S.SearchContainer>
                <h1>Todo 검색</h1>
                <S.Input 
                    name="search"
                    placeholder="검색할 내용을 입력해주세요"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}/>    
                {isPending ? (<S.LoaderContainer><SyncLoader color='#12d3e4' /></S.LoaderContainer>):(
                    <S.TodoListcontainer>
                        {todos[0]?.map((todo)=>(
                                <TodoItem 
                                    todo = {todo}
                                    deleteTodoMutation={deleteTodoMutation} 
                                    patchTodoMutation={patchTodoMutation}/>
                        ))}
                    </S.TodoListcontainer>
                )}
            </S.SearchContainer>
        </S.Container>
    )
}

export default MainPage;