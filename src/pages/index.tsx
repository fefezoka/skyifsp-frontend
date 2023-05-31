import {
  Input,
  Box,
  Flex,
  Select,
  Text,
  Button,
  Heading,
  Popover,
  PopoverTrigger,
  DatePicker,
  PopoverContent,
  Grid,
} from '@styles';
import { AvailableFlights } from '@components';
import { Control, Controller, FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiRefreshCw } from 'react-icons/fi';
import axios from '../service/axios';
import { useState } from 'react';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get<Airport[]>('http://localhost:3001/airports');

  const airports = data.map((airport) => {
    return {
      value: airport.code,
      label:
        airport.city +
        ' ' +
        airport.countryCode +
        ' - ' +
        airport.airport +
        ' ' +
        airport.code,
    };
  });

  return {
    props: {
      airports,
    },
  };
};

const formSchema = z
  .object({
    origin: z.object({
      value: z.string(),
      label: z.string(),
    }),
    destination: z.object({
      value: z.string(),
      label: z.string(),
    }),
    outward: z.date(),
    outbound: z.date().optional(),
    roundTrip: z.object({
      value: z.boolean(),
      label: z.string(),
    }),
    adults: z.number().min(1).max(8),
    kids: z.number().min(0).max(8),
  })
  .superRefine((data, ctx) => {
    if (data.roundTrip.value && !data.outbound) {
      ctx.addIssue({ code: 'invalid_date' });
    }
  });

type FormData = z.infer<typeof formSchema>;

export default function Home({
  airports,
}: {
  airports: { value: string; label: string }[];
}) {
  const [flights, setFlights] = useState<Flights>();
  const { register, setValue, getValues, watch, control, handleSubmit, setFocus } =
    useForm<FormData>({ resolver: zodResolver(formSchema) });

  const handleSubmitForm = async (data: FormData) => {
    console.log(data);
    try {
      const { data: flights } = await axios.get(
        `/flights/search?outward=${data.outward.toISOString().split('T')[0]}&origin=${
          data.origin.value
        }&destination=${data.destination.value}${
          data.roundTrip.value
            ? '&outbound=' + data.outbound?.toISOString().split('T')[0]
            : ''
        }`
      );
      // console.log(flights);
      setFlights(flights);
    } catch (e) {
      setFlights(undefined);
      console.log(e);
    }
  };

  const invertLocals = () => {
    const origin = getValues('origin');
    setValue('origin', getValues('destination'));
    setValue('destination', origin);
  };

  return (
    <Box
      as={'main'}
      css={{
        p: '$4 $3',
        maxWidth: 920,
        m: 'auto',
        '@bp2': { p: '$6 $4', border: '2px solid $bg2' },
      }}
    >
      <Box
        as={'form'}
        onSubmit={handleSubmit(handleSubmitForm)}
        css={{ '& span': { mb: 6 } }}
      >
        <Box css={{ ta: 'center', mb: '$2' }}>
          <Heading size="4" variant={'blue'} gradient>
            SKYIFSP
          </Heading>
        </Box>
        <Grid
          columns={{ '@initial': '1', '@bp2': '2' }}
          align={'stretch'}
          gap={'4'}
          css={{ mb: '$4' }}
        >
          <Box>
            <Flex justify={'between'}>
              <Text>Local de ida</Text>
              <FiRefreshCw
                onClick={invertLocals}
                size={14}
                style={{ cursor: 'pointer' }}
              />
            </Flex>
            <Select
              control={control as unknown as Control<FieldValues>}
              name={'origin'}
              placeholder={'De onde deseja sair?'}
              options={airports.filter(
                (option) => option.value !== watch('destination')?.value
              )}
            />
          </Box>
          <Box>
            <Text>Local de chegada</Text>
            <Select
              control={control as unknown as Control<FieldValues>}
              name={'destination'}
              placeholder={'Onde deseja chegar?'}
              options={airports.filter(
                (option) => option.value !== watch('origin')?.value
              )}
            />
          </Box>
        </Grid>
        <Grid columns={{ '@initial': '1', '@bp2': '4' }} gap={'4'} align={'center'}>
          <Box>
            <Text>Data de ida</Text>
            <Controller
              control={control}
              name={'outward'}
              defaultValue={new Date()}
              render={({ field }) => (
                <DatePicker
                  onChange={(date) => {
                    const outbound = watch('outbound');
                    outbound &&
                      (date as Date).getTime() > outbound.getTime() &&
                      setValue('outbound', undefined);

                    return field.onChange(date);
                  }}
                  selected={field.value}
                  selectsStart
                  onCalendarClose={() => setFocus('outbound')}
                  startDate={watch('outward')}
                  endDate={watch('outbound')}
                  monthsShown={3}
                />
              )}
            />
          </Box>
          <Box>
            <Text>Data de volta</Text>
            <Controller
              control={control}
              name={'outbound'}
              render={({ field }) => (
                <DatePicker
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  disabled={watch('roundTrip')?.value === false}
                  selectsEnd
                  startDate={watch('outward')}
                  endDate={watch('outbound')}
                  monthsShown={3}
                />
              )}
            />
          </Box>
          <Box>
            <Text>Trecho</Text>
            <Select
              control={control as unknown as Control<FieldValues>}
              name="roundTrip"
              defaultValue={{ label: 'Ida e volta', value: true }}
              options={[
                { label: 'Ida e volta', value: true },
                { label: 'Só ida', value: false },
              ]}
            />
          </Box>

          <Box>
            <Text>Número de passageiros</Text>
            <Popover>
              <PopoverTrigger asChild>
                <Flex>
                  <Button
                    css={{
                      bc: '$bg2',
                      width: '100%',
                      bs: 'none',
                      border: '1px solid $bg3',
                      justifyContent: 'start',
                      fontWeight: 400,
                      '&:hover': {
                        bc: '$bg2',
                      },
                    }}
                  >
                    {Number(watch('adults') || 1) + Number(watch('kids') || 0)}{' '}
                    Passageiros
                  </Button>
                </Flex>
              </PopoverTrigger>
              <PopoverContent>
                <Flex align={'center'} justify={'between'} css={{ mb: '$3' }}>
                  <Text size={'4'} weight={600}>
                    Adultos
                  </Text>
                  <Input
                    css={{ width: 144 }}
                    type={'number'}
                    defaultValue={1}
                    min={1}
                    max={8}
                    {...register('adults', { valueAsNumber: true, value: 1 })}
                  />
                </Flex>
                <Flex align={'center'} justify={'between'}>
                  <Text size={'4'} weight={600}>
                    Crianças
                  </Text>
                  <Input
                    css={{ width: 144 }}
                    type={'number'}
                    defaultValue={0}
                    min={0}
                    max={8}
                    {...register('kids', { valueAsNumber: true, value: 0 })}
                  />
                </Flex>
              </PopoverContent>
            </Popover>
          </Box>
        </Grid>
        <Box css={{ mt: '$4', ta: 'right' }}>
          <Button type="submit">Buscar voos</Button>
        </Box>
      </Box>
      {flights && <AvailableFlights flights={flights} />}
    </Box>
  );
}
