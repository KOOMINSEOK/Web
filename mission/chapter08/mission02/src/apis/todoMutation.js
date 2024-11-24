import { deleteTodo, getTodo, getTodoList, patchTodo, postTodo } from "./todo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../main";

function todoMutation(){
    const useTodoListQuery=(title) => useQuery({
        queryKey: ["todos",title],
        queryFn :()=>getTodoList({title}),
    })
    const useTodoQuery=(id)=>useQuery({
        queryKey: ["todos",id],
        queryFn :()=>getTodo({id}),
    })

    const {mutate: postTodoMutation} = useMutation({
        mutationFn: postTodo,
        onSuccess : (data)=>{
            console.log(data);
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            })
        },
        onError : (error)=>{
            console.log(error);
        },
        onSettled : ()=>{ 
            console.log("항상 실행됨")
        },
    })

    const {mutate: deleteTodoMutation} = useMutation({
        mutationFn: deleteTodo,
        onSuccess : ()=>{
            console.log("success");
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            })
        },
        onError : (error)=>{
            console.log("delete failed");
            console.log(error);
        }
        
    })

    const {mutate: patchTodoMutation} = useMutation({
        mutationFn: patchTodo,
        onSuccess : ()=>{
            console.log("success");
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
        },
        onError : (error)=>{
            console.log("patch failed");
            console.log(error);
            
        }
        
    })


    
return {useTodoListQuery,useTodoQuery, postTodoMutation,deleteTodoMutation,patchTodoMutation}
}


export default todoMutation;