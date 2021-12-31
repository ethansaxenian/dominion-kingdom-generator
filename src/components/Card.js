import { AspectRatio, Box, Image, LinkOverlay, Text, useBoolean, useToken } from '@chakra-ui/react';
import { isLandscape } from 'lib/utils';
import ConditionalWrapper from './ConditionalWrapper';
import PropTypes from 'prop-types';
import { cardType } from 'lib/types';

export default function Card({ card, swapCard }) {
	const [hovered, setHovered] = useBoolean();
	const [red400] = useToken('colors', ['red.400']);

	const handleClick = () => {
		if (swapCard) {
			swapCard(card);
		}
	}

	return (
		<Box
			onMouseEnter={setHovered.on}
			onMouseLeave={setHovered.off}
			onMouseMove={setHovered.on}
			border="5px solid black"
			_hover={{
				borderColor: swapCard && 'red.400',
				boxShadow: `0 0 10px 10px ${red400}`,
				transform: 'scale(1.05)'
			}}
			cursor={swapCard && 'pointer'}
			onClick={handleClick}
			w={isLandscape(card) ? '300px' : '170px'}
			m="10px"
			borderRadius="8px"
			transition="200ms"
			position="relative"
		>
			<ConditionalWrapper
				condition={!swapCard}
				wrapper={(children) => (
					<LinkOverlay isExternal href={card.link}>{children}</LinkOverlay>
				)}
			>
				<>
					<AspectRatio maxW="100%" ratio={isLandscape(card) ? 320 / 200 : 200 / 320}>
						<Image src={`${process.env.PUBLIC_URL}/${card.img}`} alt={card.name}/>
					</AspectRatio>
					{(card.bane || card.wotm) && (
						<Text
							noOfLines={1}
							isTruncated={false}
							borderRadius="8px"
							bgColor="#aaaaaaa0"
							fontWeight="bold"
							position="absolute"
							top="50%"
							left="50%"
							transform="translate(-50%, -200%)"
							w="fit-content"
							p="5px"
						>
							{card.bane ? 'Bane Card' : 'Way of the Mouse'}
						</Text>
					)}
					{hovered && (
						<Text
							noOfLines={1}
							isTruncated={false}
							color="red.700"
							borderRadius="8px"
							bgColor="#aaaaaaa0"
							fontWeight="bold"
							position="absolute"
							top="50%"
							left="50%"
							transform="translate(-50%, -95%)"
							w="fit-content"
							p="5px"
						>
							Click to swap
						</Text>
					)}
				</>
			</ConditionalWrapper>
		</Box>
	)
}

Card.propTypes = {
	card: cardType.isRequired,
	swapCard: PropTypes.func
}
