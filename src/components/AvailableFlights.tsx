import { Box, Flex, Grid, Heading, Text } from '@styles';
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
              <Grid columns={'3'} css={{ my: '$3', '& span': { pt: '$1' } }}>
                <Box>
                  <Text weight={600} size={'5'}>
                    {flights.origin.city} - {flights.origin.state}
                  </Text>
                  <Flex align={'center'} justify={'center'} gap={'1'} css={{ mt: '$1' }}>
                    <IoMdAirplane size={18} />
                    <Text>{flights.origin.airport + ' - ' + flights.origin.code}</Text>
                  </Flex>
                </Box>
                <Box />
                <Box>
                  <Text weight={600} size={'5'}>
                    {flights.destination.city} - {flights.origin.state}
                  </Text>
                  <Flex align={'center'} justify={'center'} gap={'1'} css={{ mt: '$1' }}>
                    <IoMdAirplane size={18} />
                    <Text>
                      {flights.destination.airport + ' - ' + flights.destination.code}
                    </Text>
                  </Flex>
                </Box>
              </Grid>
              <Box css={{ ta: 'center' }}>
                {route.flights.map((flight, index) => (
                  <Grid
                    columns={'3'}
                    align={'center'}
                    key={index}
                    css={{
                      ta: 'center',
                      height: 72,
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
                    <Box>
                      <Text size={'5'}>Duração</Text>
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
