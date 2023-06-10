import React from 'react';
import { Box, Flex, Grid, Heading, Text } from '@styles';
import Image from 'next/image';
import { bruxelas, rio, salvador, saopaulo, shanghai, tokyo } from '@assets';
import { IoIosArrowDroprightCircle } from 'react-icons/io';

const popularFlights = [
  {
    destination: 'Rio de Janeiro',
    image: rio.src,
  },
  {
    destination: 'Salvador',
    image: salvador.src,
  },
  {
    destination: 'São Paulo',
    image: saopaulo.src,
  },
  {
    destination: 'Tokyo',
    image: tokyo.src,
  },
  {
    destination: 'Shanghai',
    image: shanghai.src,
  },
  {
    destination: 'Bruxelas',
    image: bruxelas.src,
  },
];

export const PopularFlights = () => {
  return (
    <Box css={{ m: 'auto', maxWidth: 1024, mt: 56, px: '$4', '@bp2': { px: 0 } }}>
      <Heading css={{ ta: 'center' }} gradient variant={'blue'} size="3">
        Voos populares
      </Heading>
      <Grid columns={{ '@initial': '1', '@bp2': '3' }} gap={'4'} css={{ mt: '$6' }}>
        {popularFlights.map((flight, index) => (
          <Flex
            key={index}
            css={{
              br: '$5',
              overflow: 'hidden',
              bs: '4px 4px 13px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Image src={flight.image} height={106} width={106} alt="" />
            <Flex
              align={'center'}
              justify={'between'}
              css={{
                height: '100%',
                bc: '$bg2',
                width: '100%',
                px: '$4',
                cursor: 'pointer',
              }}
            >
              <Text weight={600} size={'4'}>
                {flight.destination}
              </Text>
              <IoIosArrowDroprightCircle size={24} />
            </Flex>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};
