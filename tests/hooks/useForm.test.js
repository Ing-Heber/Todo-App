import { act, render, renderHook, screen } from "@testing-library/react"
import { useForm } from "../../src/hooks/useForm"

describe('Testing useForm hook', () => {
    const initialForm = {
        id: '01234',
        description: 'Testing Todo',
        completed: false
    }

    test('should return initial state', () => {
        const { result } = renderHook(() => useForm(initialForm));
        expect(result.current).toEqual({
            ...initialForm,
            formState: initialForm,
            onInputChange: expect.any(Function),
            onResetForm: expect.any(Function)
        })
    })

    test('should change value', () => {

        const { result } = renderHook(() => useForm(initialForm))
        const { onInputChange } = result.current;

        act(() => {
            const event = {
                target: {
                    name: 'description',
                    value: 'New Todo Test'
                }
            }
            onInputChange(event)
        })

        expect(result.current.formState.description).toBe('New Todo Test')
        expect(result.current.description).toBe('New Todo Test')
    })

    test('should reset form value to default', () => {

        const { result } = renderHook(() => useForm(initialForm ))
        const { onInputChange, onResetForm } = result.current;

        act(() => {
            const event = {
                target: {
                    name: 'description',
                    value: 'New Todo Test'
                }
            }
            onInputChange(event)
        })

        act(() => onResetForm())

        expect(result.current).toEqual({
            ...initialForm,
            formState: initialForm,
            onInputChange: expect.any(Function),
            onResetForm: expect.any(Function)
        })
    })

})
