import { AspectRatio, Box, Image, LinkOverlay, Tag, useBoolean, useToken } from '@chakra-ui/react';
import { isLandscape } from 'lib/utils';
import ConditionalWrapper from './ConditionalWrapper';
import PropTypes from 'prop-types';
import { cardType } from 'lib/types';

export default function Card({ card, swapCard, hasWikiLink }) {
	const [hovered, setHovered] = useBoolean();
	const [hoverColor] = useToken('colors', ['red.400']);

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
			_hover={swapCard && {
				borderColor: swapCard && hoverColor,
				boxShadow: `0 0 10px 10px ${hoverColor}`,
				transform: 'scale(1.05)'
			}}
			cursor={swapCard && 'pointer'}
			onClick={handleClick}
			w={isLandscape(card) ? '300px' : '170px'}
			borderRadius="8px"
			transition="200ms"
			position="relative"
		>
			<ConditionalWrapper
				condition={!swapCard && hasWikiLink}
				wrapper={(children) => (
					<LinkOverlay isExternal href={card.link}>{children}</LinkOverlay>
				)}
			>
				<>
					<AspectRatio maxW="100%" ratio={isLandscape(card) ? 320 / 200 : 200 / 320}>
						<Image src={`${process.env.PUBLIC_URL}/${card.img}`} alt={card.name}/>
					</AspectRatio>
					{(swapCard && (card.bane || card.wotm)) && (
						<Tag
							position="absolute"
							top="50%"
							left="50%"
							transform="translate(-50%, -200%)"
							w="fit-content"
							borderRadius="full"
							colorScheme="blackAlpha"
							variant="solid"
						>
							{card.bane ? 'Bane Card' : 'Way of the Mouse'}
						</Tag>
					)}
					{(swapCard && hovered) && (
						<Tag
							position="absolute"
							top="50%"
							left="50%"
							transform="translate(-50%, -90%)"
							w="fit-content"
							borderRadius="full"
							colorScheme="blackAlpha"
							variant="solid"
						>
							Click to Swap
						</Tag>
					)}
				</>
			</ConditionalWrapper>
		</Box>
	)
}

Card.propTypes = {
	card: cardType.isRequired,
	swapCard: PropTypes.func,
	hasWikiLink: PropTypes.bool.isRequired
}
