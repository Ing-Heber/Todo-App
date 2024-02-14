import { TrashIcon } from '../../src/components/TrashIcon';
const { render, screen } = require("@testing-library/react");

describe('Testing <TrashIcon />', () => {

    test('should match Snapshoot', () => {
        const { container } = render(<TrashIcon />)
        expect(container).toMatchSnapshot();
    });

    test('should render classes & styles', () => {
        render(<TrashIcon />)
        const icon = screen.getByLabelText('TrashIcon');
        expect(icon).toBeTruthy();
        expect(icon.classList).toContainEqual('d-flex');        
    })
})