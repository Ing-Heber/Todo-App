import { act, renderHook } from "@testing-library/react";
import { useTodos } from "../../src/hooks/useTodos"

describe('Testing useTodos Hook', () => {

    const useTodosType = {
        todos: expect.any(Array),
        onAddTodo: expect.any(Function),
        onToggleTodo: expect.any(Function),
        onDeleteTodo: expect.any(Function),
        emptyTodos: expect.any(Boolean),
        allTodos: expect.any(Number),
        completedTodos: expect.any(Number)
    }

    const todo = {
        id: '123',
        description: 'Testing todo',
        completed: false
    }

    test('should return default props', () => {
        const { result } = renderHook(() => useTodos())

        expect(result.current).toEqual(useTodosType)
    })

    test('should add given todo', () => {
        const { result } = renderHook(() => useTodos())

        act(() => {
            result.current.onAddTodo(todo)
        })

        expect(result.current.todos).toEqual([todo])
        expect(result.current.allTodos).toBe(1)
        expect(result.current.emptyTodos).toBe(false)
    })

    test('should toggle given todo', () => {
        const { result } = renderHook(() => useTodos())

        act(() => {
            result.current.onToggleTodo(todo.id)
        })

        expect(result.current.todos[0].completed).toBe(true)
        expect(result.current.completedTodos).toBe(1)
    })

    test('should delete given todo', () => {
        const { result } = renderHook(() => useTodos())

        act(() => {
            result.current.onDeleteTodo(todo.id)
        })

        expect(result.current.todos.length).toBe(0)
        expect(result.current.allTodos).toBe(0)
        expect(result.current.emptyTodos).toBe(true)
        expect(result.current.completedTodos).toBe(0)

    })

})