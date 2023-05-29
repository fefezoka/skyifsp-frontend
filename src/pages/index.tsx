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
} from '@styles';
import { AvailableFlights } from '@components';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiRefreshCw } from 'react-icons/fi';
import axios from '../service/axios';
import { useState } from 'react';

const flightOptions = [
  { value: 'CGH', label: 'Congonhas - São Paulo' },
  { value: 'GIG', label: 'Galeão - Rio de Janeiro' },
  { value: 'CNF', label: 'Confins - Belo Horizonte' },
] as const;

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
    adults: z.number().min(1).max(12),
    kids: z.number().min(0).max(12),
  })
  .superRefine((data, ctx) => {
    if (data.roundTrip.value && !data.outbound) {
      ctx.addIssue({ code: 'invalid_date' });
    }
  });

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const [flights, setFlights] = useState<Flights>();
  const {
    register,
    setValue,
    getValues,
    watch,
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const handleSubmitForm = async (data: FormData) => {
    console.log(data);
    try {
      const { data: flights } = await axios.get(
        `/flights?outward=${data.outward.toISOString().split('T')[0]}&origin=${
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
        maxWidth: 800,
        m: 'auto',
        p: '$6 $4',
        border: '2px solid $bg2',
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
        <Flex align={'stretch'} gap={'4'} css={{ mb: '$4', '& > div': { flex: 1 } }}>
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
              options={flightOptions.filter((option) => option !== watch('destination'))}
            />
          </Box>
          <Box>
            <Text>Local de chegada</Text>
            <Select
              control={control as unknown as Control<FieldValues>}
              name={'destination'}
              placeholder={'Onde deseja chegar?'}
              options={flightOptions.filter((option) => option !== watch('origin'))}
            />
          </Box>
        </Flex>
        <Flex gap={'4'} css={{ '& > div': { flex: 1 } }} align={'center'}>
          <Box>
            <Text>Data de ida</Text>
            <DatePicker
              control={control as unknown as Control<FieldValues>}
              name="outward"
              selectsStart
              defaultValue={new Date()}
              onCalendarClose={() => setFocus('outbound')}
              startDate={watch('outward')}
              endDate={watch('outbound')}
            />
          </Box>
          <Box>
            <Text>Data de volta</Text>
            <DatePicker
              disabled={watch('roundTrip')?.value === false}
              control={control as unknown as Control<FieldValues>}
              name="outbound"
              selectsEnd
              startDate={watch('outward')}
              endDate={watch('outbound')}
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
        </Flex>
        <Box css={{ mt: '$4', ta: 'right' }}>
          <Button type="submit">Buscar voos</Button>
        </Box>
      </Box>
      {flights && <AvailableFlights flights={flights} />}
    </Box>
  );
}
