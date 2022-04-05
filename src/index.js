import React from 'react';
import { createRoot } from 'react-dom/client';
import App from 'components/App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme.js';
import cards from 'data/dominion_cards.json';
import { CardProvider } from 'context.js';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<ChakraProvider theme={theme}>
		<CardProvider value={{cards}}>
			<App/>
		</CardProvider>
	</ChakraProvider>
);
