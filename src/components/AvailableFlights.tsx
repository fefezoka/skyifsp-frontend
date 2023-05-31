import { Box, Flex, Grid, Heading, Text } from '@styles';
import Image from 'next/image';
import { IoMdAirplane } from 'react-icons/io';

export const AvailableFlights = ({ flights }: { flights: Flights }) => {
  return (
    <Flex direction={'column'}>
      <Box css={{ width: '100%', ta: 'center' }}>
        {flights.routes.map((route, index) => (
          <Box
            key={index}
            css={{ ...(index === 0 && { borderBottom: '2px solid $blue9' }), py: '$3' }}
          >
            <Box css={{ pr: '$4' }}>
              <Box css={{ my: '$4' }}>
                <Flex align={'center'} justify={'center'} gap={'2'}>
                  <Heading size="2">
                    {route.type === 'outward'
                      ? 'Escolha um voo de ida'
                      : 'Escolha um voo de volta'}
                  </Heading>
                </Flex>
                <Text variant={'gray'} size={'5'}>
                  {new Intl.DateTimeFormat('pt-br', { dateStyle: 'full' }).format(
                    new Date(route.flights[0].arrivalDate)
                  )}
                </Text>
              </Box>
              <Grid columns={'3'} css={{ my: '$2', '& span': { pt: '$1' }, us: 'none' }}>
                {Object.values({
                  origin: flights.origin,
                  destination: flights.destination,
                })
                  .sort(() => (index === 0 ? 1 : -1))
                  .map((airport, index) => (
                    <>
                      <Box>
                        <Image
                          width={36}
                          height={27}
                          alt=""
                          draggable={false}
                          src={`https://flagicons.lipis.dev/flags/4x3/${airport.countryCode.toLowerCase()}.svg`}
                        />
                        <Text weight={600} size={'5'}>
                          {`${airport.city} - ${airport.countryCode}`}
                        </Text>
                        <Flex
                          align={'center'}
                          justify={'center'}
                          gap={'1'}
                          css={{ mt: '$1' }}
                        >
                          <IoMdAirplane size={18} />
                          <Text>{airport.airport + ' - ' + airport.code}</Text>
                        </Flex>
                      </Box>
                      <Box />
                    </>
                  ))}
              </Grid>
              <Box css={{ ta: 'center' }}>
                {route.flights.map((flight, index) => (
                  <Grid
                    columns={'3'}
                    align={'center'}
                    key={index}
                    css={{
                      ta: 'center',
                      height: 68,
                      mb: '$2',
                      br: '$2',
                      bc: '$bg3',
                      transition: 'all 100ms ease-in',
                      '&:hover': { bc: '$blue9' },
                    }}
                  >
                    <Box>
                      <Text size={'5'}>
                        {new Intl.DateTimeFormat('pt-br', {
                          hour: 'numeric',
                          minute: 'numeric',
                          dayPeriod: 'long',
                        }).format(new Date(flight.departureDate))}
                      </Text>
                    </Box>
                    <Flex align={'center'} justify={'center'} gap={'3'}>
                      <Box>
                        <Text size={'5'} weight={600}>
                          Duração
                        </Text>
                        <Text size={'5'} css={{ mt: '$1' }}>
                          {new Intl.DateTimeFormat('pt-br', {
                            hour: 'numeric',
                            minute: 'numeric',
                            timeZone: 'UTC',
                          }).format(
                            new Date(flight.arrivalDate).getTime() -
                              new Date(flight.departureDate).getTime()
                          )}
                          h
                        </Text>
                      </Box>
                      <Box>
                        <Text size={'5'} weight={600}>
                          Preço por adulto
                        </Text>
                        <Text size={'5'} css={{ mt: '$1' }}>
                          BRL {flight.price}
                        </Text>
                      </Box>
                    </Flex>
                    <Box>
                      <Text size={'5'}>
                        {new Intl.DateTimeFormat('pt-br', {
                          hour: 'numeric',
                          minute: 'numeric',
                          dayPeriod: 'long',
                        }).format(new Date(flight.arrivalDate))}
                      </Text>
                    </Box>
                  </Grid>
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
