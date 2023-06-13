import React from 'react';
import { Box, Flex, Heading, Modal, ModalContent, ModalTrigger, Text } from '@styles';
import { IoHelpSharp } from 'react-icons/io5';
import Image from 'next/image';

const examples = [
  {
    origin: 'CGH',
    destination: 'GIG',
    originCountryCode: 'BR',
    destinationCountryCode: 'BR',
    outward: '14/06/2023',
    outbound: '29/06/2023',
  },
  {
    origin: 'CGH',
    destination: 'SSA',
    originCountryCode: 'BR',
    destinationCountryCode: 'BR',
    outward: '14/06/2023',
    outbound: '29/06/2023',
  },
  {
    origin: 'CGH',
    destination: 'HND',
    originCountryCode: 'BR',
    destinationCountryCode: 'JP',
    outward: '14/06/2023',
    outbound: '29/06/2023',
  },
  {
    origin: 'BRU',
    destination: 'HND',
    originCountryCode: 'BE',
    destinationCountryCode: 'JP',
    outward: '15/06/2023',
    outbound: '29/06/2023',
  },
  {
    origin: 'CGH',
    destination: 'BRU',
    originCountryCode: 'BR',
    destinationCountryCode: 'BE',
    outward: '14/06/2023',
    outbound: '29/06/2023',
  },
];

export const FlightsExamples = () => {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Flex
          align={'center'}
          justify={'center'}
          css={{ br: '$round', bc: '$bg3', size: 36, cursor: 'pointer' }}
        >
          <IoHelpSharp size={20} />
        </Flex>
      </ModalTrigger>
      <ModalContent css={{ ta: 'center', '@bp2': { width: 580 } }}>
        <Heading size="3" gradient variant={'blue'}>
          Exemplos de voos
        </Heading>
        <Box css={{ ox: 'scroll', '@bp2': { ox: 'unset' } }}>
          <Box as={'table'} css={{ m: 'auto', mt: '$2' }}>
            <Box as={'thead'} css={{ bc: '$blue9' }}>
              <Box as={'tr'} css={{ '& > th': { p: '$2' } }}>
                <Box as={'th'}>Local de ida</Box>
                <Box as={'th'}>Local de Volta</Box>
                <Box as={'th'}>Data de ida</Box>
                <Box as={'th'}>Data de volta</Box>
              </Box>
            </Box>
            <Box as={'tbody'}>
              {examples.map((example, index) => (
                <Box
                  as={'tr'}
                  key={index}
                  css={{ height: 48, bc: index % 2 === 0 ? '$bg2' : '$bg3' }}
                >
                  <Box as={'td'}>
                    <Flex justify={'center'}>
                      <Image
                        src={`https://flagicons.lipis.dev/flags/4x3/${example.originCountryCode.toLowerCase()}.svg`}
                        width={24}
                        height={18}
                        alt=""
                      />
                      <Text size={'4'} css={{ ml: '$2' }}>
                        {example.origin}
                      </Text>
                    </Flex>
                  </Box>
                  <Box as={'td'}>
                    <Flex justify={'center'}>
                      <Image
                        src={`https://flagicons.lipis.dev/flags/4x3/${example.destinationCountryCode.toLowerCase()}.svg`}
                        width={24}
                        height={18}
                        alt=""
                      />
                      <Text size={'4'} css={{ ml: '$2' }}>
                        {example.destination}
                      </Text>
                    </Flex>
                  </Box>
                  <Box as={'td'}>
                    <Text size={'4'}>{example.outward}</Text>
                  </Box>
                  <Box as={'td'}>
                    <Text size={'4'}>{example.outbound}</Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};
