import { render } from '@testing-library/react';
import App from 'components/App';
import { CardProvider } from 'context';

const renderWithContext = ({children}) => {
	render(
		<CardProvider value={{cards: []}}>
			{children}
		</CardProvider>
	);
}

describe('App tests', () => {

	test('Renders without crashing', () => {
		renderWithContext(<App/>);
	});

});
