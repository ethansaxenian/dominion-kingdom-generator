import { render } from '@testing-library/react';
import App from '../components/App';

describe('App tests', () => {

	test('Renders without crashing', () => {
		render(<App/>);
	});

});
