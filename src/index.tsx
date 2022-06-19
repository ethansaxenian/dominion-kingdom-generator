import ReactDOM from 'react-dom';
import { App } from 'components';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { theme } from 'theme';
import { store } from 'state';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
  document.getElementById('root')
);
