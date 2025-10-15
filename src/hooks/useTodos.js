import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";
import { types } from "../types/types";

const initializer = () => JSON.parse(localStorage.getItem('todos')) || [];

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], initializer);
    const { addTodo, toggleTodo, deleteTodo } = types;


    const onAddTodo = (todo) => {
        dispatch({
            type: addTodo,
            payload: todo
        });
    };

    const onToggleTodo = (id) => {
        dispatch({
            type: toggleTodo,
            payload: id
        });
    };

    const onDeleteTodo = (id) => {
        dispatch({
            type: deleteTodo,
            payload: id
        });
    };

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return {
        todos,
        onAddTodo,
        onToggleTodo,
        onDeleteTodo,
        emptyTodos: todos.length < 1,
        allTodos: todos.length,
        completedTodos: todos.filter(todo => todo.completed !== false).length,
        pendingTodos: todos.length - todos.filter(todo => todo.completed).length,
    }
}
