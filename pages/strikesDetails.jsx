import { useState, useEffect } from "react";
import {
  FormControl,
  Flex,
  FormLabel,
  Select,
  Stack,
  ChakraProvider,
  Center,
  Button,
  Text,
  Image,
  Grid,
  GridItem,
  Box,
  Heading,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  SimpleGrid,
  Thead,
  Container,
} from "@chakra-ui/react";
import { format, differenceInDays } from "date-fns";

export default function StrikeManager() {
  const [isClient, setIsClient] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [nome, setNome] = useState("Glacial");
  const [ocorrencia, setOcorrencia] = useState("");
  const [strikeValue, setStrikeValue] = useState(0);
  const [isNew, setIsNew] = useState(false);
  const [observationsStrike, setObservationsStrike] = useState("");
  const [strikeSaveValues, setStrikeSaveValues] = useState([]);
  const [strikeSaveValuesDetails, setStrikeSaveValuesDetails] = useState([]);

  const [goalsSaveValuesDetails, setGoalsSaveValuesDetails] = useState([]);
  const [goalsSaveValues, setGoalsSaveValues] = useState([]);

  const [bad, setBad] = useState(true);
  const [good, setGood] = useState(false);

  useEffect(() => {
    setIsClient(true);
    apiStrikes();
    apiGoals();

    if (isClient) {
    }
  }, [isClient]);

  const apiStrikes = async () => {
    console.log("apiStrikes called");
    try {
      const response = await fetch("/api/v1/getStrikeValues", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setStrikeSaveValues(data);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const apiStrikesDetails = async () => {
    console.log("apiStrikes called");
    try {
      const response = await fetch(
        `/api/v1/getStrikeValuesDetails?name=${nome}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setStrikeSaveValuesDetails(data);
      console.log(data);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const apiGoals = async () => {
    console.log("apiStrikes called");
    try {
      const response = await fetch("/api/v1/getGoalsValues", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setGoalsSaveValues(data);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const apiGoalsDetails = async () => {
    console.log("apiStrikes called");
    try {
      const response = await fetch(
        `/api/v1/getGoalsValuesDetails?name=${nome}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setGoalsSaveValuesDetails(data);
      console.log(data);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const nomes = [
    { value: "Giovani", label: "Giovani", imagem: "/imagens/giovani.jpg" },
    {
      value: "Guilherme",
      label: "Guilherme",
      imagem: "/imagens/guilherme.jpg",
    },
    {
      value: "Jaime",
      label: "Jaime",
      imagem: "/imagens/jaime.jpg",
    },
    {
      value: "Jonas",
      label: "Jonas",
      imagem: "/imagens/jonas.jpg",
    },
    {
      value: "Leonardo",
      label: "Leonardo",
      imagem: "/imagens/leonardo.jpg",
    },
    {
      value: "Murilo",
      label: "Murilo",
      imagem: "/imagens/murilo.jpg",
    },
    {
      value: "Veller",
      label: "Veller",
      imagem: "/imagens/veller.jpg",
    },
    {
      value: "Vitor",
      label: "Vitor",
      imagem: "/imagens/vitor.jpg",
    },
  ];

  const categorias = [
    "Bullyng",
    "Clubista",
    "Foi Deus que Quis",
    "Foi Lóqui",
    "Mau Comportamento",
    "Otako",
    "Repost",
    "Se Passou Demais",
    "Torce Pro Boston",
    "Violento",
    "Vive De Inter",
    "Vive De Grêmio",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsNew(false);
  };

  const getImagemPorNome = (nome) => {
    const pessoa = nomes.find((item) => item.value === nome);
    if (pessoa) {
      return pessoa.imagem;
    }
    return "/imagens/glacial.jpg";
  };

  const handleStrikeValueChange = (value) => {
    setStrikeValue(value);
    setIsNew(false);
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleClickGood = () => {
    setGood(true);
    setBad(false);
  };

  const handleClickBad = () => {
    setBad(true);
    setGood(false);
  };

  return (
<ChakraProvider>
  <Container maxW="100%" p={4}>
    <Center>
      <Stack direction="row" spacing={4} align="center">
        <Button onClick={handleClickGood}>Bem feitorias</Button>
        <Button onClick={handleClickBad}>Marginalidade</Button>
      </Stack>
    </Center>

    {good ? (
      <>
        <Center>
          <Stack spacing={4} width="100%">
            <Heading as="h1" size="xl" textAlign="center">
              Ordenado Por Bom Comportamento
            </Heading>

            <Stack
              direction={['column', 'row']}
              spacing={4}
              align={['center', 'initial']}
              justify={['center', 'initial']}
              overflowX="auto" // Adicionando overflowX para ajustar a tabela em dispositivos móveis
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Categoria</Th>
                    <Th>Balls</Th>
                    <Th>Observação</Th>
                    <Th>Data</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {goalsSaveValuesDetails.map((item) => (
                    <Tr key={item._id}>
                      <Td>{item.incidents}</Td>
                      <Td>{item.goals}</Td>
                      <Td>{item.observationsGoals}</Td>
                      <Td>
                        {item.updateDate
                          ? format(
                              new Date(item.updateDate),
                              "dd/MM/yyyy HH:mm:ss"
                            )
                          : ""}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Stack>
          </Stack>
        </Center>
      </>
    ) : null}

    {bad ? (
      <>
        <Center>
          <Stack spacing={4} width="100%">
            <Heading as="h1" size="xl" textAlign="center">
              Ordenado Por Mau Comportamento
            </Heading>

            <Stack
              direction={['column', 'row']}
              spacing={4}
              align={['center', 'initial']}
              justify={['center', 'initial']}
              overflowX="auto" // Adicionando overflowX para ajustar a tabela em dispositivos móveis
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Categoria</Th>
                    <Th>Strike Points</Th>
                    <Th>Observação</Th>
                    <Th>Data</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {strikeSaveValuesDetails.map((item) => (
                    <Tr key={item._id}>
                      <Td>{item.incidents}</Td>
                      <Td>{item.strikePoints}</Td>
                      <Td>{item.observations}</Td>
                      <Td>
                        {item.updateDate
                          ? format(
                              new Date(item.updateDate),
                              "dd/MM/yyyy HH:mm:ss"
                            )
                          : ""}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Stack>
          </Stack>
        </Center>
      </>
    ) : null}

    <Box h="50vh" w="100%" /> {/* Espaço vazio para rolagem */}
  </Container>
</ChakraProvider>



  );
}
