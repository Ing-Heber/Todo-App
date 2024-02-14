import { render, screen } from "@testing-library/react"
import { TodoList } from "../../src/components/TodoList"

describe('Testing <TodoList />', () => { 
    const list = {
        todos: [{
            id: 123,
            description: 'Testing',
            completed: false
        }],
        toggleTodo: jest.fn(),
        deleteTodo: jest.fn()
    }
    
    test('should match with snapshot', () => { 
        const {container} = render(<TodoList {...list} />)
        expect(container).toMatchSnapshot();
     })

     test('should render list', () => { 
        render(<TodoList {...list} />)
        expect(screen.getByText(list.todos[0].description)).toBeTruthy();
        
        // todo -> To test children add: data-testid="test" in div.todo__list 
        // expect(screen.getByTestId('test').children.length).toBe(list.todos.length)

     })

  })