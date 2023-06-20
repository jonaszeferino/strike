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
  Th,SimpleGrid,Thead, Container
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

  const [goalsSaveValuesDetails, setGoalsSaveValuesDetails] = useState([])
  const [goalsSaveValues, setGoalsSaveValues] = useState([])

  

  const [bad, setBad] = useState(true)
  const [good, setGood] = useState(false)
  
  
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
    setGood(!good);
    setBad(false);
  };

  const handleClickBad = () => {
    setBad(!bad);
    setGood(false);
  };

  return (
<ChakraProvider>
<Container maxW="100%" p={4}>


<Stack direction="row" spacing={4} align="center">
  <Button onClick={handleClickGood}>Bem feitorias</Button>
  <Button onClick={handleClickBad}>Marginalidade</Button>
</Stack>

        {good ? (
<>
  <Center>
  <Stack spacing={4} width="700px">
    <Heading as="h1" size="xl" textAlign="center">
      Ordenado Por Bom Comportamento
    </Heading>

    <SimpleGrid columns={[1, 2]} gap={4} minChildWidth="200px">
  {goalsSaveValues.map((item) => (
    <Box
      key={item._id}
      borderWidth="1px"
      borderRadius="md"
      p={4}
      textAlign="center"
    >
      <Flex direction="column" h="100%">
        <Image
          src={getImagemPorNome(item._id)}
          alt={item._id}
          boxSize="100%"
          objectFit="cover"
        />
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          flex="1"
          marginTop="8px"
        >
          <Text>{item._id}</Text>
          <Text>{item.totalGoals}</Text>
        </Flex>
      </Flex>
    </Box>
  ))}
</SimpleGrid>



    <FormControl>
      <FormLabel>Elemento</FormLabel>
      <Text>Selecione o Bom Cidadão Para Verificar Seus Beneficios Pra Sociedade</Text>
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
      <Button type="submit" colorScheme="teal" onClick={apiGoalsDetails} mt={2}>
        Verificar
      </Button>
    </FormControl>

    <Stack spacing={4} mt={4}>
  <Stack direction="row" spacing={4} align="center">
    <Text>Categoria</Text>
    <Text>Balls</Text>
    <Text>Observação</Text>
    <Text>Data</Text>
  </Stack>
  <Grid templateColumns="repeat(4, 1fr)" gap={4}>
    {goalsSaveValuesDetails.map((item) => (
      <Stack key={item._id} direction="row" spacing={4} align="center">
        <Text>{item.incidents}</Text>
        <Text>{item.goals}</Text>
        <Text>{item.observationsGoals}</Text>
        <Text>
          {item.updateDate
            ? format(new Date(item.updateDate), "dd/MM/yyyy HH:mm:ss")
            : ""}
        </Text>
      </Stack>
    ))}
  </Grid>
</Stack>

  </Stack>
  </Center>
  </>

) : null}

{bad ? (
<>
  <Center>
  <Stack spacing={4} width="700px">
    <Heading as="h1" size="xl" textAlign="center">
      Ordenado Por Mau Comportamento
    </Heading>

    <SimpleGrid columns={[1, 2]} gap={4}>
  {strikeSaveValues.map((item) => (
    <Box
      key={item._id}
      borderWidth="1px"
      borderRadius="md"
      p={4}
      textAlign="center"
    >
      <Flex direction="column" h="100%">
        <Image
          src={getImagemPorNome(item._id)}
          alt={item._id}
          boxSize="100%"
          objectFit="cover"
        />
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          flex="1"
          marginTop="8px"
        >
          <Text>{item._id}</Text>
          <Text>{item.totalStrikePoints}</Text>
        </Flex>
      </Flex>
    </Box>
  ))}
</SimpleGrid>


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

    <Stack spacing={4} mt={4}>
  <Stack direction="row" spacing={4} align="center">
    <Text>Categoria</Text>
    <Text>Strike Points</Text>
    <Text>Observação</Text>
    <Text>Data</Text>
  </Stack>
  <Grid templateColumns="repeat(4, 1fr)" gap={4}>
    {strikeSaveValuesDetails.map((item) => (
      <Stack key={item._id} direction="row" spacing={4} align="center">
        <Text>{item.incidents}</Text>
        <Text>{item.strikePoints}</Text>
        <Text>{item.observations}</Text>
        <Text>
          {item.updateDate
            ? format(new Date(item.updateDate), "dd/MM/yyyy HH:mm:ss")
            : ""}
        </Text>
      </Stack>
    ))}
  </Grid>
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
