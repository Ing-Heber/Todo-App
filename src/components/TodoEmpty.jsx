import './styles.css';

export const TodoEmpty = () => {
    return (
        <div className='todo-empty__container d-flex flex-column align-items-center animate__animated animate__fadeIn'>
            <img src='./assets/clipboard.svg' alt="Clipboard image" width='56px' height='auto' />
            <h3 className='text-center color-gray-300'>
                Congratulations! <br />
                <span className='fw-regular'> You have finished your pendings</span>
            </h3>
        </div>
    )
}
