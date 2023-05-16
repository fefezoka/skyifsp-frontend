import { Input, Box, Flex, Select, Text, Grid, Button, Heading } from '@styles';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';

const getServerSideProps = async () => {
  // const data = await axios.get('');

  return {
    props: {},
  };
};

const formSchema = z.object({
  ida: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .transform((data) => data.value),
  volta: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .transform((data) => data.value),
  dataIda: z
    .string()
    .nonempty()
    .transform((data) => new Date(data)),
  dataVolta: z
    .string()
    .nonempty()
    .transform((data) => new Date(data)),
  trecho: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .transform((data) => data.value),
  clientes: z.coerce.number().min(1).max(12),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const {
    register,
    setValue,
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  console.log(errors);
  const handleSubmitForm = (data: FormData) => {
    console.log(data);
  };

  const invertLocals = () => {
    const ida = getValues('ida');
    setValue('ida', getValues('volta'));
    setValue('volta', ida);
  };

  return (
    <Box
      as={'main'}
      css={{
        maxWidth: 800,
        m: 'auto',
        p: '$6 $4 $2 $4',
        border: '2px solid $bg2',
      }}
    >
      <Box as={'form'} onSubmit={handleSubmit(handleSubmitForm)}>
        <Box css={{ ta: 'center', mb: '$2' }}>
          <Heading size="4" variant={'blue'} gradient>
            SKYNET IFSP
          </Heading>
        </Box>
        <Flex align={'stretch'} gap={'4'} css={{ mb: '$3', '& > div': { flex: 1 } }}>
          <Box>
            <Flex justify={'between'}>
              <Text>Voo de ida</Text>
              <FiRefreshCw onClick={invertLocals} />
            </Flex>
            <Select
              control={control as unknown as Control<FieldValues>}
              name={'ida'}
              placeholder={'De onde deseja sair?'}
              options={[
                { value: 'SP', label: 'São Paulo' },
                { value: 'RJ', label: 'Rio de Janeiro' },
              ]}
            />
          </Box>
          <Box>
            <Text>Voo de chegada</Text>
            <Select
              control={control as unknown as Control<FieldValues>}
              name={'volta'}
              placeholder={'Onde deseja chegar?'}
              options={[
                { value: 'SP', label: 'São Paulo' },
                { value: 'RJ', label: 'Rio de Janeiro' },
              ]}
            />
          </Box>
        </Flex>
        <Flex gap={'4'} css={{ '& > div': { flex: 1 } }}>
          <Box>
            <Text>Data de ida</Text>
            <Input type={'date'} {...register('dataIda')} />
          </Box>
          <Box>
            <Text>Data de volta</Text>
            <Input type={'date'} {...register('dataVolta')} />
          </Box>
          <Box>
            <Text>Trecho</Text>
            <Select
              control={control as unknown as Control<FieldValues>}
              name="trecho"
              defaultValue={{ label: 'Ida e volta', value: 'ida-e-volta' }}
              options={[
                { label: 'Ida e volta', value: 'ida-e-volta' },
                { label: 'Só ida ou volta', value: 'ida' },
              ]}
            />
          </Box>
          <Box>
            <Text>Clientes</Text>
            <Input
              type={'number'}
              defaultValue={1}
              min={1}
              max={12}
              {...register('clientes')}
            />
          </Box>
        </Flex>
        <Box css={{ mt: '$4', ta: 'right' }}>
          <Button type="submit">Buscar voos</Button>
        </Box>
      </Box>
      <Text as={'pre'}>{JSON.stringify(getValues(), null, 4)}</Text>
    </Box>
  );
}
