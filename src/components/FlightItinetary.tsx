import React from 'react';
import { Modal, ModalTrigger, Text, ModalContent, Heading, Flex, Box } from '@styles';
import { formatDuration } from '@utils';
import Image from 'next/image';

interface IFlightItinetary {
  flight: Flight;
  children: React.ReactNode;
}

export const FlightItinetary = ({ children, flight }: IFlightItinetary) => {
  return (
    <Modal>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent css={{ '@bp2': { width: 520 }, ta: 'center' }}>
        <Heading gradient variant={'blue'} size="3">
          Percurso da viagem
        </Heading>
        <Flex direction={'column'} css={{ mt: '$2' }}>
          {flight.flightLegs.map((leg, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <Flex
                  css={{
                    width: '100%',
                    height: 44,
                    bc: '$bg2',
                    br: '$3',
                  }}
                  justify={'center'}
                  align={'center'}
                >
                  <Box>
                    <Text>Espera de </Text>
                    <Text weight={600}>
                      {formatDuration({
                        start: flight.flightLegs[index - 1]?.arrivalDate,
                        end: leg.departureDate,
                      })}
                    </Text>
                    <Text> em</Text>
                    <Text weight={600}> {leg.origin.city}</Text>
                  </Box>
                </Flex>
              )}
              <Flex align={'center'} justify={'between'} css={{ py: '$4' }}>
                {Object.values({
                  origin: leg.origin,
                  destination: leg.destination,
                }).map((airport, index) => (
                  <React.Fragment key={index}>
                    <Flex direction={'column'} gap={'2'} align={'center'} key={index}>
                      <Image
                        width={36}
                        height={27}
                        alt=""
                        draggable={false}
                        src={`https://flagicons.lipis.dev/flags/4x3/${airport.countryCode.toLowerCase()}.svg`}
                      />
                      <Text size={'5'} weight={600}>
                        {airport.city} - {airport.code}
                      </Text>
                      <Text>
                        {new Intl.DateTimeFormat('pt-br', {
                          dateStyle: 'medium',
                        }).format(index === 0 ? leg.departureDate : leg.arrivalDate)}
                      </Text>
                      <Text size={'5'} weight={'600'}>
                        {new Intl.DateTimeFormat('pt-br', {
                          hour: 'numeric',
                          minute: 'numeric',
                          dayPeriod: 'long',
                        }).format(index === 0 ? leg.departureDate : leg.arrivalDate)}
                      </Text>
                    </Flex>
                    {index === 0 && (
                      <Flex direction={'column'} align={'center'} gap={'1'}>
                        <Text size={'2'}>Duração</Text>
                        <Text weight={600}>
                          {formatDuration({
                            start: leg.departureDate,
                            end: leg.arrivalDate,
                          })}
                        </Text>
                        <Text size={'2'}>{leg.airplane.plane}</Text>
                      </Flex>
                    )}
                  </React.Fragment>
                ))}
              </Flex>
            </React.Fragment>
          ))}
        </Flex>
      </ModalContent>
    </Modal>
  );
};
