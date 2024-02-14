import { fireEvent, render, screen } from "@testing-library/react";
import { TodoForm } from "../../src/components/TodoForm";

describe('Testing <TodoForm />', () => {
    const onNewTodo = jest.fn();

    test('should match with snapshot', () => {
        const { container } = render(<TodoForm onNewTodo={onNewTodo} />)
        expect(container).toMatchSnapshot()
    })

    test('should render items', () => {
        render(<TodoForm onNewTodo={onNewTodo} />)

        // todo: add data-testid='addTodoForm' to form 
        // Form & children
        // expect(screen.getByTestId('addTodoForm')).toBeTruthy();
        // expect(screen.getByTestId('addTodoForm').children.length).toBe(2);

        // description input
        expect(screen.getByRole('textbox')).toBeTruthy();

        // add todo button
        expect(screen.getByLabelText('Add Todo')).toBeTruthy();

        // add todo icon
        expect(screen.getByAltText('Plus Image')).toBeTruthy();
    })

    test('should call onNewTodo function when form submit', () => {
        render(<TodoForm onNewTodo={onNewTodo} />);

        const input = screen.getByRole('textbox');
        const submitBtn = screen.getByLabelText('Add Todo');

        // To test input change
        fireEvent.change(input, { target: { value: 'Testing event' } })
        expect(input.value).toBe('Testing event');

        // To test form submit
        fireEvent.click(submitBtn);
        expect(onNewTodo).toHaveBeenCalledWith({
            description: expect.any(String),
            completed: expect.any(Boolean),
            id: expect.any(Number),
        });

    })



});