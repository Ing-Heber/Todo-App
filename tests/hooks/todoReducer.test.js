import { todoReducer } from "../../src/hooks/todoReducer"
import { types } from "../../src/types/types"


describe('Testing todoReducer ', () => {
    const initialState = [{
        id: '123',
        description: 'Testing todoReducer',
        completed: false
    }]

    test('should return default state', () => {
        const newState = todoReducer(initialState, {})
        expect(newState).toEqual(initialState)
    })

    test('should return new added Todo', () => {
        const newTodo = {
            id: '456',
            description: 'New test',
            completed: false
        }

        const addNewTodo = {
            type: types.addTodo,
            payload: newTodo
        }
        const newState = todoReducer(initialState, addNewTodo)

        expect(newState.length).toBe(2)
        expect(newState).toContain(newTodo)
    })

    test('should delete given Todo', () => {
        const initialState = [{
            id: '123',
            description: 'Testing todoReducer',
            completed: false
        },
        {
            id: '456',
            description: 'New test',
            completed: false
        }]

        const deleteTodo = {
            type: types.deleteTodo,
            payload: initialState[1].id
        }

        const newState = todoReducer(initialState, deleteTodo)

        expect(newState.length).toBe(1)
        expect(newState).not.toContain(initialState[1])
    })

    test('should toggle given Todo to completed', () => {
        const initialState = [{
            id: '123',
            description: 'Testing todoReducer',
            completed: false
        },
        {
            id: '456',
            description: 'New test',
            completed: false
        }]

        const toggleTodo = {
            type: types.toggleTodo,
            payload: initialState[1].id
        }

        const newState = todoReducer(initialState, toggleTodo)
        expect(newState[1].completed).toBe(true);
    })
    
})