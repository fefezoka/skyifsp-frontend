import { useState } from 'react';
import { GetStaticProps } from 'next';
import { Control, Controller, FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoIosArrowDown } from 'react-icons/io'
import axios from '../service/axios';
import {format} from 'date-fns'
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

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get<Airport[]>(
    'http://skyifsp-backend.vercel.app/airports'
  );

  const airports = data.map((airport) => {
    return {
      value: airport.code,
      label:
        airport.city +
        ', ' +
        airport.airport +
        ' ' +
        airport.code +
        ' - ' +
        airport.country,
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
    dates: z.date().array(),
    roundTrip: z.boolean(),
    adults: z.number().min(1).max(8),
    kids: z.number().min(0).max(8),
  })
  .superRefine((data, ctx) => {
    if (data.roundTrip && !data.dates[1]) {
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
        `/flights/search?outward=${data.dates[0].toISOString().split('T')[0]}&origin=${
          data.origin.value
        }&destination=${data.destination.value}${
          data.roundTrip
            ? '&outbound=' + data.dates[1]?.toISOString().split('T')[0]
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
    <Box as={'main'}>
      <Box css={{ borderBottom: '2px solid $bg2', bc: '$bg1' }}>
        <Box
          as={'form'}
          onSubmit={handleSubmit(handleSubmitForm)}
          css={{
            maxWidth: 920,
            m: 'auto',
            p: '$6',
          }}
        >
          <Box css={{ ta: 'center', mb: '$3' }}>
            <Heading size="4" variant={'blue'} gradient>
              SKYIFSP
            </Heading>
          </Box>
          <Grid
            columns={{ '@initial': '1', '@bp2': '3' }}
            align={'stretch'}
            gap={'4'}
            css={{ mb: '$4' }}
          >
            <Box>
              <Text>Local de ida</Text>
              {/* <FiRefreshCw
                onClick={invertLocals}
                size={14}
                style={{ cursor: 'pointer' }}
              /> */}
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
            <Box>
              <Text>Data de ida</Text>
              <Flex css={{br: '$2', overflow: 'hidden'}}>
                <Controller
                  control={control}
                  name={'dates'}
                  defaultValue={[new Date()]}
                  render={({ field }) => (
                    <DatePicker
                      onChange={(date) => {
                        const outbound = watch('dates')[1];
                        outbound &&
                          (date as [Date, Date])[0].getTime() > outbound.getTime() &&
                          setValue('dates', [getValues('dates')[0]]);
                        return field.onChange(date);
                      }}
                      selectsRange
                      value={format(watch('dates')?.[0].getTime() || new Date(), 'dd/MM/yyyy')}
                      startDate={watch('dates')?.[0]}
                      endDate={watch('dates')?.[1]}
                      monthsShown={3}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={'dates'}
                  render={({ field }) => (
                    <DatePicker
                      onChange={(date) => {
                        return field.onChange([getValues('dates')[0], date]);
                      }}
                      selectsEnd
                      selected={watch('dates')?.[1]}
                      startDate={watch('dates')?.[0]}
                      endDate={watch('dates')?.[1]}
                      monthsShown={3}
                    />
                  )}
                />
              </Flex>
            </Box>
          </Grid>
          <Flex gap={'4'} align={'center'} justify={'end'}>
            <Flex align={'center'} gap={'2'}>
              <Button ghost active={watch('roundTrip')} onClick={() => setValue('roundTrip', true)}>
                Ida e volta
              </Button>
              <Button ghost active={!watch('roundTrip')} onClick={() => setValue('roundTrip', false)}>
                Só ida
              </Button>
            </Flex>
            <Box>
              <Popover>
                <PopoverTrigger asChild>
                  <Flex as={'button'} gap={'1'}>
                    <Text>
                      {Number(watch('adults') || 1) + Number(watch('kids') || 0)}{' '}
                      Passageiros
                    </Text>
                    <IoIosArrowDown />
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
             <Button css={{ width: '100%', '@bp2': { width: 120 } }} type="submit">
              Procurar
            </Button>
          </Flex>
        </Box>
      </Box>

      {flights && (
        <Box
          css={{
            maxWidth: 920,
            m: 'auto',
            '@bp2': { border: '2px solid $bg2', borderTop: 0 },
          }}
        >
          <AvailableFlights flights={flights} />{' '}
        </Box>
      )}
    </Box>
  );
}
