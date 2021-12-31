import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
	<ChakraProvider theme={theme}>
		<App/>
	</ChakraProvider>
), document.getElementById('root'));
