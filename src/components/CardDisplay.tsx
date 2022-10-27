import {
  AspectRatio,
  Box,
  HStack,
  Highlight,
  Image,
  LinkOverlay,
  Spinner,
  Tag,
  Text,
} from '@chakra-ui/react';
import { Card, isLandscape } from 'lib';
import { SwapCardButton } from './SwapCardButton';
import { LockCardButton } from './LockCardButton';
import { FC, useState } from 'react';

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
  const [showNameFallback, setShowNameFallback] = useState(true);

  const cardWidth = isLandscape(card) ? '72' : '44';
  const fallbackImg = isLandscape(card)
    ? 'card-back-landscape.png'
    : 'card-back.png';

  return (
    <Box w={cardWidth} borderRadius="8px" position="relative">
      <AspectRatio
        maxW="100%"
        ratio={isLandscape(card) ? 325 / 200 : 200 / 320}
      >
        <LinkOverlay isExternal href={card.link}>
          <Image
            w={cardWidth}
            src={card.img_path}
            alt={card.name}
            border="5px solid black"
            borderRadius="8px"
            fallbackSrc={`${process.env.PUBLIC_URL}/${fallbackImg}`}
            onLoad={() => setShowNameFallback(false)}
          />
          {showNameFallback ? (
            <Highlight
              query={card.name}
              styles={{
                position: 'absolute',
                px: '1',
                bg: 'white',
                borderRadius: '8px',
                fontSize: 16,
                fontWeight: 700,
                opacity: 0.8,
              }}
            >
              {card.name}
            </Highlight>
          ) : undefined}
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
