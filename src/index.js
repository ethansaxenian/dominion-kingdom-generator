import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme.js';
import cards from 'data/dominion_cards.json';

export const Context = React.createContext();

ReactDOM.render((
	<ChakraProvider theme={theme}>
		<Context.Provider value={{cards}}>
			<App/>
		</Context.Provider>
	</ChakraProvider>
), document.getElementById('root'));
