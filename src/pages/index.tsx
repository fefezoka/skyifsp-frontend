import { Input, Box, Flex, Select, Text, Grid, Button, Heading } from "@styles";
import { Control, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const getServerSideProps = async () => {
  const data = await axios.get("");

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
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  console.log(errors);
  const handleSubmitForm = (data: FormData) => {
    console.log(data);
  };

  return (
    <Box
      as={"main"}
      css={{
        maxWidth: 800,
        m: "auto",
        p: "$6 $4 $2 $4",
        border: "2px solid $bg2",
      }}
    >
      <Box as={"form"} onSubmit={handleSubmit(handleSubmitForm)}>
        <Box css={{ ta: "center" }}>
          <Heading size="3">SKYNET IFSP</Heading>
        </Box>
        <Grid columns={"2"} gap={"4"} css={{ mb: "$2" }}>
          <Box>
            <Text>Voo de ida</Text>
            <Select
              control={control as unknown as Control<FieldValues>}
              name={"ida"}
              placeholder={"De onde deseja sair?"}
              options={[
                { value: "SP", label: "São Paulo" },
                { value: "RJ", label: "Rio de Janeiro" },
              ]}
            />
          </Box>
          <Box>
            <Text>Voo de chegada</Text>
            <Select
              control={control as unknown as Control<FieldValues>}
              name={"volta"}
              placeholder={"Onde deseja chegar?"}
              options={[
                { value: "SP", label: "São Paulo" },
                { value: "RJ", label: "Rio de Janeiro" },
              ]}
            />
          </Box>
        </Grid>
        <Grid columns={"4"} gap={"4"}>
          <Box>
            <Text>Data de ida</Text>
            <Input type={"date"} {...register("dataIda")} />
          </Box>
          <Box>
            <Text>Data de volta</Text>
            <Input type={"date"} {...register("dataVolta")} />
          </Box>
          <Box>
            <Text>Trecho</Text>
            <Select
              control={control as unknown as Control<FieldValues>}
              name="trecho"
              defaultValue={{ label: "Ida e volta", value: "ida-e-volta" }}
              options={[
                { label: "Ida e volta", value: "ida-e-volta" },
                { label: "Só ida ou volta", value: "ida" },
              ]}
            />
          </Box>
          <Box>
            <Text>Clientes</Text>
            <Input
              type={"number"}
              defaultValue={1}
              min={1}
              max={12}
              {...register("clientes")}
            />
            {/*<Select
              control={control as unknown as Control<FieldValues>}
              name="clientes"
              defaultValue={{ label: "1 Pessoa", value: 1 }}
              options={[...Array(10)].map((_, index) => ({
                label: `${index + 1} ${index > 0 ? "Pessoas" : "Pessoa"}`,
                value: index + 1,
              }))}
            />*/}
          </Box>
        </Grid>
        <Flex justify={"end"} gap={"2"} css={{ mt: "$2" }}>
          <Button onClick={() => reset()}>Reset</Button>
          <Button type="submit" css={{ bc: "$slate10", bs: "none" }}>
            Buscar voos
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
