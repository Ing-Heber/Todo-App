import PropTypes from 'prop-types';
import { useState } from "react";

const completedStyle = 'card__description--completed';
const fadeIn = 'animate__fadeIn'
const fadeOut = 'animate__fadeOut'

export const useTodoItem = ({ id, completed, toggleTodo, deleteTodo }) => {
    const [cardAnimation, setCardAnimation] = useState(fadeIn);

    const onToggle = () => toggleTodo(id);

    const onDelete = () => {
        setCardAnimation(fadeOut);
        setTimeout(() => {
            deleteTodo(id);
        }, 500)
    }

    return {
        cardAnimation,
        descriptionStyle: completed ? completedStyle : '',
        onToggle,
        onDelete,
    }
}

useTodoItem.propTypes = {
    id: PropTypes.number,
    completed: PropTypes.bool,
    toggleTodo: PropTypes.func,
    deleteTodo: PropTypes.func
}
