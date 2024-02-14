import PropTypes from 'prop-types'
import { TrashIcon } from './TrashIcon'
import { useTodoItem } from '../hooks/useTodoItem'

export const TodoItem = ({ id, description, completed, toggleTodo, deleteTodo }) => {

    const {
        cardAnimation,
        descriptionStyle,
        onToggle,
        onDelete
    } = useTodoItem({ id, completed, toggleTodo, deleteTodo });

    return (
        <div className={`todo__card animate__animated ${cardAnimation}`}>
            <div className='card__content d-flex align-items-center'>
                <input className='input__checkbox' type="checkbox" name={description} id={id} checked={completed} onChange={onToggle} />
                <label htmlFor={id} className={`card__description ${descriptionStyle}`} >{description}</label>
            </div>
            <button aria-label='delete button' className='btn--delete' onClick={onDelete}>
                <TrashIcon />
            </button>
        </div>
    )
}

TodoItem.propTypes = {
    id: PropTypes.number,
    description: PropTypes.string,
    completed: PropTypes.bool,
    toggleTodo: PropTypes.func,
    deleteTodo: PropTypes.func
}

