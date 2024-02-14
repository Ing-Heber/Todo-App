import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from "../../src/components/TodoItem";

describe('Testing <TodoItem />', () => {
    
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    const itemValues = {
        id: 123,
        description: 'Test',
        completed: false,
        toggleTodo: jest.fn(),
        deleteTodo: jest.fn()
    }

    test('should match with Snapshoot', () => {
        const { container } = render(<TodoItem {...itemValues} />)
        expect(container).toMatchSnapshot();
    })

    test('should render given values', () => {
        render(<TodoItem {...itemValues} />)

        // Todo Add data-testid={id} in component to test.
        // expect(screen.getByTestId(itemValues.id)).toBeTruthy();
        
        expect(screen.getByText(itemValues.description)).toBeTruthy();
        expect(screen.getByRole('checkbox', { name: 'Test', checked: itemValues.completed })).toBeTruthy();
    })

    test('should call toogleTodo on input click', () => {
        render(<TodoItem {...itemValues} />)
        const checkbox = screen.getByRole('checkbox', { name: 'Test' })

        fireEvent.click(checkbox)
        expect(itemValues.toggleTodo).toHaveBeenCalled()
        expect(itemValues.toggleTodo).toHaveBeenCalledWith(itemValues.id)

    })

    test('should call deleteTodo on button click', () => {
        render(<TodoItem {...itemValues} />)
        const deleteBtn = screen.getByRole('button', {name: 'delete button'})

        fireEvent.click(deleteBtn)
        // To simulate the 500 ms delay
        jest.advanceTimersByTime(500);
        expect(itemValues.deleteTodo).toHaveBeenCalled()
        expect(itemValues.deleteTodo).toHaveBeenCalledWith(itemValues.id)


    })


})