import ReactDOM from 'react-dom';
import { App } from 'components';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import cards from 'data/dominion_cards.json';
import { theme } from 'theme';
import { AppContext, store } from 'state';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <AppContext.Provider
        value={{
          cards: cards.map((card) => ({
            ...card,
            wotm: false,
            bane: false,
            locked: false,
          })),
        }}
      >
        <App />
      </AppContext.Provider>
    </Provider>
  </ChakraProvider>,
  document.getElementById('root')
);
