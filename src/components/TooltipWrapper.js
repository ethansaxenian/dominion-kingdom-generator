import { Box, Tooltip } from '@chakra-ui/react';
import { forwardRef } from 'react';

const fr = forwardRef(({ children, ...rest }, ref) => {
	<Box ref={ref} {...rest}>
		{children}
	</Box>
})

export default function TooltipWrapper({ children, ...rest }) {
	return (
		<Tooltip {...rest}>
			{forwardRef(<CustomCard {...rest}>{children}</CustomCard>)}
		</Tooltip>
	)
}
