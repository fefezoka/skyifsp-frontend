import { useState } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { FaUser } from 'react-icons/fa';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoIosArrowDown } from 'react-icons/io';
import { MdTripOrigin, MdLocationOn, MdCalendarMonth } from 'react-icons/md';
import axios from '../services/axios';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
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
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
} from '@styles';
import {
  AvailableFlights,
  FlightsExamples,
  Header,
  Login,
  PopularFlights,
} from '@components';
import { spinner } from '@assets';

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
      ctx.addIssue({ code: 'invalid_date', path: ['dates'] });
    }
  });

type FormData = z.infer<typeof formSchema>;

export default function Home({
  airports,
}: {
  airports: { value: string; label: string }[];
}) {
  const [flights, setFlights] = useState<Flights>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>();
  const {
    register,
    getValues,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmitForm = async (data: FormData) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const { data: flights } = await axios.get(
        `/flights/search?outward=${format(data.dates[0], 'yyyy-MM-dd')}&origin=${
          data.origin.value
        }&destination=${data.destination.value}${
          data.roundTrip ? '&outbound=' + format(data.dates[1], 'yyyy-MM-dd') : ''
        }&adults=${data.adults}${data.kids > 0 ? '&kids=' + data.kids : ''}`
      );
      setIsLoading(false);
      setFlights(flights);
    } catch (e) {
      setIsError(true);
      setFlights(undefined);
      console.log(e);
    }
  };

  return (
    <Box as={'main'}>
      <Box css={{ borderBottom: '2px solid $bg2', bc: '$bg1' }}>
        <Box
          css={{
            maxWidth: 920,
            m: 'auto',
            p: '$6',
          }}
        >
          <Header />
          <Box as={'form'} css={{ mt: '$4' }} onSubmit={handleSubmit(handleSubmitForm)}>
            <Grid
              columns={{ '@initial': '1', '@bp2': '3' }}
              align={'stretch'}
              gap={'4'}
              css={{ mb: '$4' }}
            >
              <Box>
                <Flex css={{ mb: '$1' }} justify={'between'}>
                  <Flex gap={'1'}>
                    <MdTripOrigin size={14} />
                    <Text>Local de ida</Text>
                  </Flex>
                  {errors.origin && <Text variant={'red'}>* Obrigatório</Text>}
                </Flex>
                <Controller
                  control={control}
                  name={'origin'}
                  render={({ field }) => (
                    <Select
                      placeholder={'De onde deseja sair?'}
                      options={airports}
                      value={field.value}
                      onChange={(e) => {
                        if (
                          (e as { label: string; value: string }).value ===
                          watch('destination')?.value
                        ) {
                          setValue('destination', getValues('origin'));
                        }
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </Box>
              <Box>
                <Flex css={{ mb: '$1' }} justify={'between'}>
                  <Flex gap={'1'}>
                    <MdLocationOn size={14} />
                    <Text>Local de chegada</Text>
                  </Flex>
                  {errors.destination && <Text variant={'red'}>* Obrigatório</Text>}
                </Flex>
                <Controller
                  control={control}
                  name={'destination'}
                  render={({ field }) => (
                    <Select
                      placeholder={'Onde deseja chegar?'}
                      options={airports.filter(
                        (option) => option.value !== watch('origin')?.value
                      )}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Box>
              <Box>
                <Flex css={{ mb: '$1' }} justify={'between'}>
                  <Flex gap={'1'}>
                    <MdCalendarMonth size={14} />
                    <Text>Datas</Text>
                  </Flex>
                  {errors.dates && <Text variant={'red'}>* Obrigatório</Text>}
                </Flex>
                <Flex css={{ br: '$2', overflow: 'hidden' }}>
                  <Controller
                    control={control}
                    name={'dates'}
                    render={({ field }) => (
                      <DatePicker
                        placeholderText="Data de ida"
                        onChange={(date) =>
                          field.onChange(Array.isArray(date) ? date : [date])
                        }
                        selectsRange={!(watch('roundTrip') === false)}
                        value={
                          watch('dates')?.[0] &&
                          format(watch('dates')?.[0].getTime(), 'dd/MM/yyyy')
                        }
                        selected={watch('dates')?.[0]}
                        startDate={watch('dates')?.[0]}
                        endDate={watch('roundTrip') ? watch('dates')?.[1] : undefined}
                        monthsShown={3}
                      />
                    )}
                  />
                  {!(watch('roundTrip') === false) && (
                    <Controller
                      control={control}
                      name={'dates'}
                      render={({ field }) => (
                        <DatePicker
                          placeholderText={'Data de volta'}
                          disabled={!watch('dates')?.[0]}
                          onChange={(date) => {
                            if (
                              (date as Date).getTime() < getValues('dates')[0].getTime()
                            ) {
                              return setValue('dates', [date as Date]);
                            }

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
                  )}
                </Flex>
              </Box>
            </Grid>
            <Flex
              gap={'4'}
              align={'center'}
              justify={'end'}
              direction={{ '@initial': 'column', '@bp2': 'row' }}
            >
              <Flex align={'center'} gap={'4'}>
                <Controller
                  name="roundTrip"
                  control={control}
                  defaultValue={true}
                  render={({ field }) => (
                    <Button
                      onClick={() => field.onChange(true)}
                      ghost
                      active={field.value}
                    >
                      Ida e volta
                    </Button>
                  )}
                />
                <Controller
                  control={control}
                  name="roundTrip"
                  defaultValue={false}
                  render={({ field }) => (
                    <Button
                      onClick={() => field.onChange(false)}
                      ghost
                      active={!field.value}
                    >
                      Só ida
                    </Button>
                  )}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button ghost css={{ gap: 4 }}>
                      <Text>
                        {Number(watch('adults') || 1) + Number(watch('kids') || 0)}{' '}
                        Passageiros
                      </Text>
                      <IoIosArrowDown size={16} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Flex align={'center'} justify={'between'} css={{ mb: '$4' }}>
                      <Text size={'4'} weight={600}>
                        Adultos
                      </Text>
                      <Input
                        css={{ width: 84, minHeight: 36 }}
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
                        css={{ width: 84, minHeight: 36 }}
                        type={'number'}
                        defaultValue={0}
                        min={0}
                        max={8}
                        {...register('kids', { valueAsNumber: true, value: 0 })}
                      />
                    </Flex>
                  </PopoverContent>
                </Popover>
              </Flex>
              <Button
                css={{ width: '100%', br: '$7', '@bp2': { width: 120 } }}
                type="submit"
              >
                Procurar
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>

      {isError ? (
        <Flex justify={'center'} css={{ mt: 48 }}>
          <Heading size="3" gradient variant={'blue'}>
            Voo não encontrado
          </Heading>
        </Flex>
      ) : isLoading ? (
        <Flex justify={'center'} css={{ mt: 36 }}>
          <Image src={spinner} height={120} width={120} alt="" />
        </Flex>
      ) : flights ? (
        <AvailableFlights flights={flights} />
      ) : (
        <PopularFlights />
      )}
    </Box>
  );
}
