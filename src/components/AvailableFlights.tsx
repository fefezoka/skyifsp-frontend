import { Box, Flex, Heading, Text } from "@styles";
import { IoMdAirplane } from "react-icons/io";

interface Flight {
  type: string;
  preco: string;
  lugarIda: string;
  lugarChegada: string;
  date: Date;
  flights: {
    dataIda: Date;
    dataChegada: Date;
  }[];
}

interface Flights {
  ida: Flight;
  volta: Flight;
}

const Flight = ({ flight }: { flight: Flight }) => {
  return (
    <Box>
      <Box css={{ mb: "$3" }}>
        <Flex align={"center"} gap={"2"}>
          <IoMdAirplane size={18} />
          <Heading>
            {flight.type.charAt(0).toUpperCase() +
              flight.type.slice(1, flight.type.length)}
          </Heading>
        </Flex>
        <Text variant={"gray"}>
          {new Intl.DateTimeFormat("pt-br", { dateStyle: "full" }).format(
            flight.date
          )}
        </Text>
      </Box>

      {flight.flights.map((voo, index) => (
        <Flex gap={"3"} align={"baseline"}>
          <Box>
            {index === 0 && <Heading>{flight.lugarIda}</Heading>}
            <Heading>Horário de ida</Heading>
            <Text>
              {new Intl.DateTimeFormat("pt-br", {
                hour: "numeric",
                minute: "numeric",
                dayPeriod: "long",
              }).format(voo.dataIda)}
            </Text>
          </Box>
          <Box>
            {index === 0 && <Heading>{flight.lugarChegada}</Heading>}
            <Heading>Horário de Chegada</Heading>
            <Text>
              {new Intl.DateTimeFormat("pt-br", {
                hour: "numeric",
                minute: "numeric",
                dayPeriod: "long",
              }).format(voo.dataChegada)}
            </Text>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export const AvailableFlights = () => {
  const flights: Flights = {
    ida: {
      type: "ida",
      date: new Date("2023-05-23T23:41:22.321Z"),
      lugarIda: "Rio Branco",
      lugarChegada: "São José dos Campos",
      preco: "44.6",
      flights: [
        {
          dataIda: new Date("2023-05-23T13:26:26.321Z"),
          dataChegada: new Date("2023-05-23T14:40:22.321Z"),
        },
        {
          dataIda: new Date("2023-05-23T13:23:22.321Z"),
          dataChegada: new Date("2023-05-23T14:41:22.321Z"),
        },
        {
          dataIda: new Date("2023-05-23T12:41:22.321Z"),
          dataChegada: new Date("2023-05-23T14:41:22.321Z"),
        },
      ],
    },
    volta: {
      type: "volta",
      date: new Date("2023-05-23T23:41:22.321Z"),
      preco: "44.6",
      lugarIda: "São José dos Campos",
      lugarChegada: "Rio Branco",
      flights: [
        {
          dataIda: new Date("2023-05-23T23:41:22.321Z"),
          dataChegada: new Date("2023-05-23T23:41:22.321Z"),
        },
        {
          dataIda: new Date("2023-05-23T23:41:22.321Z"),
          dataChegada: new Date("2023-05-23T23:41:22.321Z"),
        },
        {
          dataIda: new Date("2023-05-23T23:41:22.321Z"),
          dataChegada: new Date("2023-05-23T23:41:22.321Z"),
        },
      ],
    },
  };

  return (
    <Box>
      <Flight flight={flights.ida} />
      <Box css={{ height: 2, bc: "$blue9", my: "$3" }} />
      <Flight flight={flights.volta} />
    </Box>
  );
};
