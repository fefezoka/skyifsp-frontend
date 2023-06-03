import { Box, Button, Flex, Text } from '@styles';
import Image from 'next/image';
import { RiFlightLandLine, RiFlightTakeoffLine } from 'react-icons/ri';
import { IoAirplane } from 'react-icons/io5';
import { differenceInDays } from 'date-fns';
import { formatDuration } from '@utils';
import { useEffect, useState } from 'react';
import { produce } from 'immer';

interface Cart {
  outward?: Flight;
  outbound?: Flight;
}

export const AvailableFlights = ({ flights }: { flights: Flights }) => {
  const [selectedFlights, setSelectedFlights] = useState<Cart>({
    outbound: undefined,
    outward: undefined,
  });

  console.log(flights);

  useEffect(() => {
    setSelectedFlights({
      outward: flights.routes[0].flights[0],
      outbound: flights.routes[1]?.flights[0],
    });
  }, [flights]);

  const handleInsertFlight = (flight: Flight, route: 'outward' | 'outbound') => {
    const alreadyIn = selectedFlights?.[route]?.id === flight.id;

    if (alreadyIn) {
      return;
    }

    setSelectedFlights((old) =>
      produce(old, (draft) => {
        draft[route] = flight;
      })
    );
  };

  return (
    <Flex
      justify={'center'}
      css={{ width: '100%' }}
      direction={{ '@initial': 'column', '@bp2': 'row' }}
    >
      <Box
        css={{
          width: '100%',
          flexGrow: 1,
          ta: 'center',
          px: '$4',
          '@bp2': { border: '2px solid $bg2', borderTop: 0, maxWidth: 920 },
        }}
      >
        {flights.routes.map((route, routeIndex) => (
          <Box
            key={routeIndex}
            css={{
              borderBottom: '2px solid $bg2',
              py: '$3',
            }}
          >
            <Box>
              <Box css={{ mt: '$4', mb: '$6' }}>
                <Box>
                  <Text size={'7'}>Escolha um </Text>{' '}
                  <Text size={'7'} weight={'600'}>
                    {route.type === 'outward' ? 'voo de ida' : 'voo de volta'}
                  </Text>
                </Box>
                <Text variant={'gray'}>
                  {new Intl.DateTimeFormat('pt-br', { dateStyle: 'full' }).format(
                    route.flights[0].departureDate
                  )}
                </Text>
              </Box>
              <Flex css={{ mb: '$4', mx: '$4' }} justify={'between'}>
                {Object.values({
                  origin: flights.origin,
                  destination: flights.destination,
                })
                  .sort(() => (routeIndex === 0 ? 1 : -1))
                  .map((airport, airportIndex) => (
                    <Flex
                      direction={'column'}
                      align={'center'}
                      key={routeIndex + airportIndex}
                      css={{ '@bp2': { width: '33.33%' } }}
                    >
                      <Image
                        width={36}
                        height={27}
                        alt=""
                        draggable={false}
                        src={`https://flagicons.lipis.dev/flags/4x3/${airport.countryCode.toLowerCase()}.svg`}
                      />
                      <Text weight={600} size={'5'} css={{ mt: '$3' }}>
                        {`${airport.city} - ${airport.country}`}
                      </Text>
                      <Flex
                        align={'center'}
                        justify={'center'}
                        gap={'1'}
                        css={{ mt: '$1' }}
                      >
                        {airportIndex === 0 ? (
                          <RiFlightTakeoffLine size={18} />
                        ) : (
                          <RiFlightLandLine size={18} />
                        )}
                        <Text>{airport.airport + ' - ' + airport.code}</Text>
                      </Flex>
                    </Flex>
                  ))}
              </Flex>
              <Box css={{ ta: 'center' }}>
                {route.flights.map((flight, flightIndex) => (
                  <Flex
                    key={flightIndex}
                    direction={'column'}
                    onClick={() => handleInsertFlight(flight, route.type)}
                    css={{
                      cursor: 'pointer',
                      px: '$4',
                      bc: selectedFlights[route.type] === flight ? '$blue9' : '$bg3',
                      '&:hover': { bc: '$blue9' },
                      bs: 'var(--colors-bg3) 0px 2px 4px 0px',
                      mb: '$3',
                      br: '$3',
                      transition: 'all 100ms ease-in',
                    }}
                  >
                    <Flex
                      align={'center'}
                      css={{
                        borderBottom: '2px solid $bg1',
                        ta: 'center',
                        minHeight: 96,
                        '& > div, & > span': { width: '33.33%' },
                      }}
                    >
                      <Text size={'7'} weight={500}>
                        {new Intl.DateTimeFormat('pt-br', {
                          hour: 'numeric',
                          minute: 'numeric',
                          dayPeriod: 'long',
                        }).format(flight.departureDate)}
                      </Text>
                      <Flex direction={'column'} align={'center'}>
                        <Text>
                          {formatDuration({
                            start: flight.departureDate,
                            end: flight.arrivalDate,
                          })}
                        </Text>
                        <Flex align={'center'} gap={'1'}>
                          <Box
                            css={{
                              height: 1,
                              bc: '$slate12',
                              width: 84,
                              '@bp2': { width: 120 },
                            }}
                          />
                          <IoAirplane />
                        </Flex>
                        <Text variant={'green'} weight={600}>
                          Direto
                        </Text>
                      </Flex>
                      <Flex justify={'center'} as={Text} size={'7'} weight={500}>
                        {new Intl.DateTimeFormat('pt-br', {
                          hour: 'numeric',
                          minute: 'numeric',
                          dayPeriod: 'long',
                        }).format(flight.arrivalDate)}
                        {differenceInDays(flight.arrivalDate, flight.departureDate) >
                          0 && (
                          <Text size={'2'}>
                            +{differenceInDays(flight.arrivalDate, flight.departureDate)}
                          </Text>
                        )}
                      </Flex>
                    </Flex>
                    <Flex css={{ minHeight: 54 }} align={'center'} justify={'end'}>
                      <Flex direction={'column'} css={{ width: '33%' }}>
                        <Text size={'2'}>A partir de</Text>
                        <Text size={'5'} weight={600} css={{ mt: 4 }}>
                          BRL {flight.priceDetails.pricePerAdult}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        css={{
          p: '$5',
          position: 'sticky',
          top: 0,
          height: '100%',
          width: '100%',
          borderRight: '2px solid $bg2',
          borderBottom: '2px solid $bg2',
          fs: 0,

          '@bp2': {
            width: 260,
          },
        }}
      >
        <Box css={{ my: '$3' }}>
          <Text size={'7'} weight={600} variant={'blue'}>
            Resumo do pedido
          </Text>
        </Box>
        {(selectedFlights.outward || selectedFlights.outbound) &&
          Object.values({ ...selectedFlights }).map(
            (flight, index) =>
              flight && (
                <Box key={index}>
                  <Box css={{ mb: '$2' }}>
                    <Text weight={600} size={'4'}>
                      {index === 0 ? 'Voo de ida' : 'Voo de volta'}
                    </Text>
                  </Box>
                  {flight.priceDetails.items.map((item, index) => (
                    <Flex key={index} justify={'between'} css={{ mb: '$2' }}>
                      <Text>{item.message}</Text>
                      <Text weight={600}>BRL {item.amount}</Text>
                    </Flex>
                  ))}
                </Box>
              )
          )}
        <Box css={{ height: 2, bc: '$blue9', width: '100%', my: '$4' }} />
        <Flex justify={'between'} css={{ mb: '$2' }}>
          <Text weight={600}>Preço final</Text>
          <Text weight={600}>
            BRL{' '}
            {(
              (selectedFlights.outward?.priceDetails.total || 0) +
              (selectedFlights.outbound?.priceDetails.total || 0)
            ).toFixed(2)}
          </Text>
        </Flex>
        <Button css={{ width: '100%', mt: '$2', br: '$6' }}>Escolher assentos</Button>
      </Box>
    </Flex>
  );
};
