import PropTypes from 'prop-types'
import { TodoItem } from "./TodoItem"

export const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
    return (
        <div className="todo__list d-flex flex-column">
            {
                todos && todos.map(({ id, description, completed }) => (
                    <TodoItem
                        key={id}
                        id={id}
                        description={description}
                        completed={completed}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                    />
                ))
            }
        </div>
    )
}

TodoList.propTypes = {
    todos: PropTypes.array,
    toggleTodo: PropTypes.func,
    deleteTodo: PropTypes.func
}