import React, { useState } from 'react'
import { useTodo } from '../contexts'

function TodoItem({ todo }) {
    const [isTodoEditable, setisTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo) //todo as a object aa rha hai fir usme 3 chheze hai to uski todo vlaue lene ke liye todo.todo
    const {updateTodo, deleteTodo, toggleComplete} = useTodo() //Todocontext se aa rha hai ye

    const editTodo = () => {
        updateTodo(todo.id, {...todo, todo: todoMsg}) // pehle spread kiya fir har value ka access lene ke baad ek value change krdi
        setisTodoEditable(false)
    }
    
    const toggleCompleted = () =>{
    toggleComplete(todo.id) //todo is prop jo TodoItem me aa rha hai
    }


    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setisTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
