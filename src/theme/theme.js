import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	styles: {
		global: {
			'*, *::before, *::after': {
				'box-sizing': 'border-box'
			},
			'*': {
				margin: 0
			},
			'html, body': {
				height: '100%'
			},
			body: {
				'line-height': 1.5,
				'-webkit-font-smoothing': 'antialiased'
			},
			'img, picture, video, canvas, svg': {
				display: 'block',
				'max-width': '100%'
			}
		}
	}
});

export default theme;
