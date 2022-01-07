import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme.js';
import cards from 'data/dominion_cards.json';
import { CardContext } from 'context.js';

ReactDOM.render((
	<ChakraProvider theme={theme}>
		<CardContext.Provider value={{cards}}>
			<App/>
		</CardContext.Provider>
	</ChakraProvider>
), document.getElementById('root'));
