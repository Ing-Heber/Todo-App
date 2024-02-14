import PropTypes from 'prop-types';
import { useState } from 'react'

export const useForm = (initialValue = {}) => {

    const [formState, setFormState] = useState(initialValue);

    const onInputChange = ({ target }) => {
        const { value, name } = target;

        setFormState({
            ...formState,
            [name]: value
        });

    }

    const onResetForm = () => setFormState(initialValue);

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    }
}

useForm.propTypes = {
    initialValue: PropTypes.object
}