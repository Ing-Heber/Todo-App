import PropTypes from 'prop-types';
import { types } from "../types/types";


export const todoReducer = (initialState = [], action) => {
    const { addTodo, toggleTodo, deleteTodo } = types;

    switch (action.type) {
        case addTodo:
            return [...initialState, action.payload];

        case toggleTodo:
            return initialState.map(todo => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo;
            });

        case deleteTodo:
            return initialState.filter(todo => todo.id !== action.payload);


        default:
            return initialState;
    }
}

todoReducer.propTypes = {
    initialState: PropTypes.array,
    action: PropTypes.object
}
