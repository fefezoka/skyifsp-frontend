import {
  Input,
  Box,
  Flex,
  Select,
  Text,
  Grid,
  Button,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@styles";
import { AvailableFlight } from "@components";
import { Control, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiRefreshCw } from "react-icons/fi";
import axios from "axios";

const formSchema = z.object({
  ida: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .transform((data) => data.value),
  chegada: z
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
  clientesAdultos: z.coerce.number().min(1).max(12),
  clientesCriancas: z.coerce.number().min(1).max(12),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const {
    register,
    setValue,
    getValues,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const handleSubmitForm = (data: FormData) => {
    console.log(data);
  };

  const invertLocals = () => {
    const ida = getValues("ida");
    setValue("ida", getValues("chegada"));
    setValue("chegada", ida);
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
        <Box css={{ ta: "center", mb: "$2" }}>
          <Heading size="4" variant={"blue"} gradient>
            SKYNET IFSP
          </Heading>
        </Box>
        <Flex
          align={"stretch"}
          gap={"4"}
          css={{ mb: "$3", "& > div": { flex: 1 } }}
        >
          <Box>
            <Flex justify={"between"}>
              <Text>Voo de ida</Text>
              <FiRefreshCw onClick={invertLocals} />
            </Flex>
            <Select
              control={control as unknown as Control<FieldValues>}
              name={"ida"}
              placeholder={"De onde deseja sair?"}
              options={[
                { value: "SP-CG", label: "Congonhas - São Paulo" },
                { value: "RJ-GA", label: "Galeão - Rio de Janeiro" },
              ]}
            />
          </Box>
          <Box>
            <Text>Voo de chegada</Text>
            <Select
              control={control as unknown as Control<FieldValues>}
              name={"chegada"}
              placeholder={"Onde deseja chegar?"}
              options={[
                { value: "SP-CG", label: "Congonhas - São Paulo" },
                { value: "RJ-GA", label: "Galeão - Rio de Janeiro" },
              ]}
            />
          </Box>
        </Flex>
        <Flex gap={"4"} css={{ "& > div": { flex: 1 } }} align={"center"}>
          <Box>
            <Text>Data de ida</Text>
            <Input
              type={"date"}
              value={new Date().toISOString().split("T")[0]}
              {...register("dataIda")}
            />
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
            <Text>Número de passageiros</Text>
            <Popover>
              <PopoverTrigger asChild>
                <Flex>
                  <Button
                    css={{
                      bc: "$bg2",
                      width: "100%",
                      bs: "none",
                      border: "1px solid $bg3",
                      justifyContent: "start",
                      "&:hover": {
                        bc: "$bg2",
                      },
                    }}
                  >
                    {Number(watch("clientesAdultos")) +
                      Number(watch("clientesCriancas"))}{" "}
                    Passageiros
                  </Button>
                </Flex>
              </PopoverTrigger>
              <PopoverContent>
                <Flex align={"center"} justify={"between"} css={{ mb: "$3" }}>
                  <Text size={"4"} weight={600}>
                    Adultos
                  </Text>
                  <Input
                    css={{ width: 144 }}
                    type={"number"}
                    defaultValue={1}
                    min={1}
                    max={8}
                    {...register("clientesAdultos")}
                  />
                </Flex>
                <Flex align={"center"} justify={"between"}>
                  <Text size={"4"} weight={600}>
                    Crianças
                  </Text>
                  <Input
                    css={{ width: 144 }}
                    type={"number"}
                    defaultValue={0}
                    min={0}
                    max={8}
                    {...register("clientesCriancas")}
                  />
                </Flex>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>
        <Box css={{ mt: "$4", ta: "right" }}>
          <Button type="submit">Buscar voos</Button>
        </Box>
      </Box>
      <Text as={"pre"}>{JSON.stringify(getValues(), null, 4)}</Text>
    </Box>
  );
}
