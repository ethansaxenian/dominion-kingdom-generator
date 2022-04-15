import { render } from '@testing-library/react';
import App from 'components/App';
import ProjectContext from 'context';

const renderWithContext = ({children}) => {
	render(
		<ProjectContext.Provider value={{cards: []}}>
			{children}
		</ProjectContext.Provider>
	);
}

describe('App tests', () => {

	test('Renders without crashing', () => {
		renderWithContext(<App/>);
	});

});
