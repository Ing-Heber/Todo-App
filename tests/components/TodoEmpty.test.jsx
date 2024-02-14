import { render, screen } from "@testing-library/react"
import { TodoEmpty } from "../../src/components/TodoEmpty"

describe('Testing <TodoEmpty />', () => { 

    test('should match with snapshot', () => { 
        const {container} = render(<TodoEmpty />)
        expect(container).toMatchSnapshot();
     })

     test('should render image', () => { 
        render(<TodoEmpty />)
        expect(screen.getByAltText('Clipboard image')).toBeTruthy()
     })

     test('should render header', () => { 
        render(<TodoEmpty />)
        expect(screen.getByRole('heading', {name: 'Congratulations! You have finished your pendings',level: 3})).toBeTruthy();
     })
    

 })