import {
  AspectRatio,
  Box,
  HStack,
  Image,
  LinkOverlay,
  Spinner,
  Tag,
} from '@chakra-ui/react';
import { Card, isLandscape } from 'lib';
import { SwapCardButton } from './SwapCardButton';
import { LockCardButton } from './LockCardButton';
import { FC } from 'react';

export interface CardDisplayProps {
  card: Card;
  swap: boolean;
  lock: boolean;
  blackMarket?: boolean;
}

export const CardDisplay: FC<CardDisplayProps> = ({
  card,
  swap,
  lock,
  blackMarket,
}) => {
  const cardWidth = isLandscape(card) ? '72' : '44';

  return (
    <Box w={cardWidth} borderRadius="8px" position="relative">
      <AspectRatio
        maxW="100%"
        ratio={isLandscape(card) ? 325 / 200 : 200 / 320}
      >
        <LinkOverlay isExternal href={card.link}>
          <Image
            w={cardWidth}
            src={`data:image/jpeg;base64,${card.img_b64}`}
            alt={card.name}
            border="5px solid black"
            borderRadius="8px"
            fallback={<Spinner size="xl" />}
          />
        </LinkOverlay>
      </AspectRatio>
      {swap && (
        <HStack py="5px" justify="space-evenly">
          <SwapCardButton card={card} isBlackMarket={blackMarket} />
          {lock && <LockCardButton card={card} />}
        </HStack>
      )}
      {swap && (card.bane || card.wotm) && (
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
  );
};
