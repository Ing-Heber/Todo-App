import './styles.css';
import PropTypes from "prop-types";

export const TodoEmpty = ({pendingTodos = 0}) => {
    const count = Number.isFinite(pendingTodos) ? pendingTodos : 0;
    const isPending = count > 0;
    const plural = count === 1 ? 'task' : 'tasks';

    const titles = {
        pending: 'Carry On!',
        completed: 'Congratulations!'
    };
    const messages = {
        pending: `You have ${count} ${plural} to finish`,
        completed: 'You have finished your pendings'
    };

    const text = isPending
        ? {title: titles.pending, message: messages.pending}
        : {title: titles.completed, message: messages.completed};

    return (
        <div className='todo-empty__container d-flex flex-column align-items-center animate__animated animate__fadeIn'>
            <img src='/assets/clipboard.svg' alt="Clipboard" width={56} />
            <h3 className='text-center color-gray-300'>
                {text.title} <br/>
                <span className='fw-regular'>{text.message}</span>
            </h3>
        </div>
    );
};

TodoEmpty.propTypes = {
    pendingTodos: PropTypes.number
};