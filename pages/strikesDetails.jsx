import { useState, useEffect } from "react";
import {
  FormControl,
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

  console.log(observationsStrike);
  console.log(strikeSaveValues);
  console.log(strikeSaveValuesDetails);
  console.log(nome);
  useEffect(() => {
    setIsClient(true);
    apiStrikes();

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

  const Clean = () => {
    setIsNew(false);
    setIsSent(false);
    setNome("Glacial");
    setOcorrencia("");
    setStrikeValue(0);
    setStrike1Clicked(false);
    setStrike2Clicked(false);
    setStrike3Clicked(false);
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  return (
<ChakraProvider>
  <Stack spacing={4} p={4}>
    <Heading as="h1" size="xl" textAlign="center">
      Ordenado Por Mau Comportamento
    </Heading>

    <Center>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {strikeSaveValues.map((item) => (
          <Box
            key={item._id}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            textAlign="center"
          >
            <Image
              src={getImagemPorNome(item._id)}
              alt={item._id}
              boxSize="100%"
              objectFit="cover"
            />
            <Text>{item._id}</Text>
            <Text>{item.totalStrikePoints}</Text>
          </Box>
        ))}
      </Grid>
    </Center>

    <FormControl>
      <FormLabel>Elemento</FormLabel>
      <Text>Selecione o Meliante para verificar os detalhes</Text>
      <Select
        name="nome"
        placeholder="Selecione o Meliante"
        disabled={isNew}
        onChange={handleNomeChange}
        value={nome}
      >
        {nomes.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
      <Button type="submit" colorScheme="teal" onClick={apiStrikesDetails} mt={2}>
        Verificar
      </Button>
    </FormControl>

    <Table mt={4}>
      <Tbody>
        <Tr>
          <Th>Categoria</Th>
          <Th>Strike Points</Th>
          <Th>Observação</Th>
          <Th>Data</Th>
        </Tr>
        {strikeSaveValuesDetails.map((item) => (
          <Tr key={item._id}>
            <Td>{item.incidents}</Td>
            <Td>{item.strikePoints}</Td>
            <Td>{item.observations}</Td>
            <Td>
              {item.updateDate
                ? format(new Date(item.updateDate), "dd/MM/yyyy HH:mm:ss")
                : ""}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Stack>

  <Box h="100vh"></Box> {/* Espaço vazio para rolagem */}
</ChakraProvider>

  );
}
