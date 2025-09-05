import PropTypes from 'prop-types'
import { useForm } from '../hooks/useForm';

export const TodoForm = ({ onNewTodo }) => {

  const { description, onInputChange, onResetForm } = useForm({
    description: '',
  });


  const onSubmit = (event) => {
    const newTodo = {
      id: new Date().getTime() * 3,
      description: description,
      completed: false
    }

    event.preventDefault();
    if (description.trim().length < 3) return;

    onNewTodo(newTodo);
    onResetForm();
  }

  return (
    <form className='inline-form' onSubmit={onSubmit}>

      <input className='input__text' name='description' type="text" value={description} onChange={onInputChange} placeholder='Add Todo' />

      <button aria-label="Add Todo" type='submit' className='btn__solid--primary'>
        <span className='d-none d-md-block'>Add Todo</span>
        <img src='/assets/plus.svg' alt="Plus Image" width='16px' height='auto' />
      </button>

    </form>
  )
};

TodoForm.propTypes = {
  onNewTodo: PropTypes.func
}