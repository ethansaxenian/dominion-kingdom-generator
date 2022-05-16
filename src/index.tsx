import ReactDOM from 'react-dom';
import App from 'components/App';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import cards from 'data/dominion_cards.json';
import { AppContext } from './context';
import { theme } from 'theme';
import { store } from 'redux';

ReactDOM.render((
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <AppContext.Provider value={{ cards }}>
        <App/>
      </AppContext.Provider>
    </Provider>
  </ChakraProvider>
), document.getElementById('root'));
