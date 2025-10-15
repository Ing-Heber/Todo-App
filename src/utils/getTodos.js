import {showTypes} from "../types/index.js";

export const getFilteredTodosByStatus = (showType, todos) => {
    switch (showType) {
        case showTypes.all:
            return todos;

        case showTypes.completed:
            return todos.filter(todo => todo.completed);

        case showTypes.pending:
            return todos.filter(todo => !todo.completed);

        default:
            return todos;
    }
}