import { render } from '@testing-library/react';
import App from 'components/App';
import AppContext from 'context';

const renderWithContext = ({children}) => {
  render(
    <AppContext.Provider value={{cards: []}}>
      {children}
    </AppContext.Provider>
  );
}

describe('App tests', () => {

  test('Renders without crashing', () => {
    renderWithContext(<App/>);
  });

});
