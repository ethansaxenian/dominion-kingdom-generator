import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme.js';
import cards from 'data/dominion_cards.json';
import { CardProvider } from 'context.js';

ReactDOM.render((
	<ChakraProvider theme={theme}>
		<CardProvider value={{cards}}>
			<App/>
		</CardProvider>
	</ChakraProvider>
), document.getElementById('root'));
