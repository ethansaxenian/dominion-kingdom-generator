import { AspectRatio, Box, HStack, IconButton, Image, LinkOverlay, Spinner, Tag } from '@chakra-ui/react';
import { isLandscape } from 'lib/utils';
import PropTypes from 'prop-types';
import { cardType } from 'lib/types';
import { VscArrowSwap } from 'react-icons/vsc';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';

export default function Card({ card, swapCard, lockCard }) {
  return (
    <Box
      w={isLandscape(card) ? '300px' : '170px'}
      borderRadius="8px"
      position="relative"
    >
      <AspectRatio maxW="100%" ratio={isLandscape(card) ? 325 / 200 : 200 / 320}>
        <LinkOverlay isExternal href={card.link}>
          <Image
            src={`${process.env.PUBLIC_URL}/${card.img}`}
            alt={card.name}
            border="5px solid black"
            borderRadius="8px"
            fallback={<Spinner size="xl"/>}
          />
        </LinkOverlay>
      </AspectRatio>
      {swapCard && (
        <HStack py="5px" justify="space-evenly">
          <IconButton
            colorScheme="red"
            icon={<VscArrowSwap/>}
            onClick={() => swapCard(card)}
          />
          {lockCard && (
            <IconButton
              colorScheme={card.locked ? 'green' : 'blue'}
              icon={card.locked ? <LockIcon/> : <UnlockIcon/>}
              onClick={() => lockCard(card)}
            />
          )}
        </HStack>
      )}
      {(swapCard && (card.bane || card.wotm)) && (
        <Tag
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -200%)"
          w="fit-content"
          borderRadius="full"
          colorScheme="gray"
          variant="solid"
        >
          {card.bane ? 'Bane Card' : 'Way of the Mouse'}
        </Tag>
      )}
    </Box>
  )
}

Card.propTypes = {
  card: cardType.isRequired,
  swapCard: PropTypes.func,
  lockCard: PropTypes.func
}
