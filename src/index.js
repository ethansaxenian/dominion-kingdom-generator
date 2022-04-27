import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme.js';
import { Provider } from 'react-redux';
import store from 'redux/store';
import cards from 'data/dominion_cards.json';
import AppContext from 'context';

ReactDOM.render((
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <AppContext.Provider value={{cards}}>
        <App/>
      </AppContext.Provider>
    </Provider>
  </ChakraProvider>
), document.getElementById('root'));
