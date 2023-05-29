import { Box, Flex, Grid, Heading, Text } from '@styles';
import { IoMdAirplane } from 'react-icons/io';

export const AvailableFlights = ({ flights }: { flights: Flights }) => {
  return (
    <Flex>
      <Box css={{ width: '100%', ta: 'center' }}>
        {flights.routes.map((route, index) => (
          <Box
            key={index}
            css={{ ...(index === 0 && { borderBottom: '2px solid $blue9' }), py: '$3' }}
          >
            <Box css={{ pr: '$4' }}>
              <Box>
                <Flex align={'center'} justify={'center'} gap={'2'}>
                  <IoMdAirplane size={18} />
                  <Heading>
                    {route.type === 'outward' ? 'Voos de ida' : 'Voos de volta'}
                  </Heading>
                </Flex>
                <Text variant={'gray'}>
                  {new Intl.DateTimeFormat('pt-br', { dateStyle: 'full' }).format(
                    new Date(route.flights[0].arrivalDate)
                  )}
                </Text>
              </Box>
              <Grid columns={'3'} css={{ my: '$3', '& span': { pt: '$1' } }}>
                <Box>
                  <Text weight={600} size={'5'}>
                    Horário de ida
                  </Text>
                  <Text weight={600} size={'5'}>
                    {flights.origin.city}
                  </Text>
                  <Text>{flights.origin.airport + ' - ' + flights.origin.code}</Text>
                </Box>
                <Box />
                <Box>
                  <Text weight={600} size={'5'}>
                    Horário de Chegada
                  </Text>
                  <Text weight={600} size={'5'}>
                    {flights.destination.city}
                  </Text>
                  <Text>
                    {flights.destination.airport + ' - ' + flights.destination.code}
                  </Text>
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
                      height: 52,
                      br: '$7',
                      '&:hover': { bc: '$blue9' },
                    }}
                  >
                    <Box>
                      <Text>
                        {new Intl.DateTimeFormat('pt-br', {
                          hour: 'numeric',
                          minute: 'numeric',
                          dayPeriod: 'long',
                        }).format(new Date(flight.departureDate))}
                        h
                      </Text>
                    </Box>
                    <Box>
                      <Text>Duração</Text>
                      <Text>
                        {new Intl.DateTimeFormat('pt-br', {
                          hour: 'numeric',
                          minute: 'numeric',
                          timeZone: 'UTC',
                        }).format(
                          new Date(flight.arrivalDate).getTime() -
                            new Date(flight.departureDate).getTime()
                        )}
                      </Text>
                    </Box>
                    <Box>
                      <Text>
                        {new Intl.DateTimeFormat('pt-br', {
                          hour: 'numeric',
                          minute: 'numeric',
                          dayPeriod: 'long',
                        }).format(new Date(flight.arrivalDate))}
                        h
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
