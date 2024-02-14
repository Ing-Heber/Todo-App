import { act, renderHook } from "@testing-library/react"
import { useTodoItem } from "../../src/hooks/useTodoItem"

describe('Testing todoItem hook', () => {

    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    const todo = {
        id: '0123',
        completed: false,
        toggleTodo: jest.fn(),
        deleteTodo: jest.fn()
    }

    test('should render default state', () => {

        const { result } = renderHook(() => useTodoItem(todo));

        expect(result.current).toEqual({
            cardAnimation: 'animate__fadeIn',
            descriptionStyle: '',
            onToggle: expect.any(Function),
            onDelete: expect.any(Function)
        })
    })

    test('should call toggle method with id', () => {
        const { result } = renderHook(() => useTodoItem(todo));

        act(() => {
            result.current.onToggle(todo.id)
        })

        expect(todo.toggleTodo).toHaveBeenCalledWith(todo.id)
    })

    test('should call deleteTodo method with id', () => {
        const { result } = renderHook(() => useTodoItem(todo));

        act(() => {
            result.current.onDelete(todo.id)
        });

        // As timer have not been simulated
        expect(todo.deleteTodo).not.toHaveBeenCalled()

        // Now timeOut should be called
        jest.advanceTimersByTime(500);
        expect(todo.deleteTodo).toHaveBeenCalled();
        expect(todo.deleteTodo).toHaveBeenCalledWith(todo.id);

        // To confirm timeout is called
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);

    })

})