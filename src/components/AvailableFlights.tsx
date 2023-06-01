import { Box, Flex, Grid, Text } from '@styles';
import Image from 'next/image';
import { RiFlightLandLine, RiFlightTakeoffLine } from 'react-icons/ri';
import { IoAirplane } from 'react-icons/io5';
import { differenceInDays } from 'date-fns';
import { formatDuration } from '@utils';

export const AvailableFlights = ({ flights }: { flights: Flights }) => {
  return (
    <Flex direction={'column'} css={{ px: '$4' }}>
      <Box css={{ width: '100%', ta: 'center' }}>
        {flights.routes.map((route, index) => (
          <Box
            key={index}
            css={{ ...(index === 0 && { borderBottom: '2px solid $bg2' }), py: '$3' }}
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
                  .sort(() => (index === 0 ? 1 : -1))
                  .map((airport, airportIndex) => (
                    <Flex
                      direction={'column'}
                      align={'center'}
                      key={index + airportIndex}
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
                {route.flights.map((flight, index) => (
                  <Flex
                    key={index}
                    direction={'column'}
                    css={{
                      px: '$4',
                      bc: '$bg3',
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
                        <Text variant={'green'} weight={500}>
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
                          BRL {flight.price}
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
      <Box css={{ width: 330, borderLeft: '2px solid $blue9' }}></Box>
    </Flex>
  );
};
