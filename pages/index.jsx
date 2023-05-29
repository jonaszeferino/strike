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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

export default function StrikeManager() {
  const [isClient, setIsClient] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [nome, setNome] = useState("Glacial");
  const [ocorrencia, setOcorrencia] = useState("");
  const [strikeValue, setStrikeValue] = useState(0);
  const [isNew, setIsNew] = useState(false);
  const [observationsStrike, setObservationsStrike] = useState("");
  const [strikeSaveValues, setStrikeSaveValues] = useState([]);

  console.log(observationsStrike);
  console.log(strikeSaveValues);

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

  const apiCall = async () => {
    setIsNew(true);
    try {
      const response = await fetch("/api/v1/putStrikeManager", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nome,
          incidents: ocorrencia,
          strikePoints: strikeValue,
          observations: observationsStrike,
        }),
      });
      const data = await response.json();

      setIsSent(true);
      setOcorrencia("");
      apiStrikes();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsNew(false);
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleOcorrenciaChange = (event) => {
    setOcorrencia(event.target.value);
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

  const handleObservationsStrikeChange = (event) => {
    setObservationsStrike(event.target.value);
  };

  const Clean = () => {
    setIsNew(false);
    setIsSent(false);
    setNome("Glacial");
    setOcorrencia("");
    setStrikeValue(0);
    
  };

  return (
    <ChakraProvider>
      <Center>
        <Stack spacing={4} width="600px">
          <form onSubmit={handleSubmit} method="post">
            <FormControl>
              <FormLabel>Elemento</FormLabel>
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
            </FormControl>
            <FormControl>
              <FormLabel>Ocorrência</FormLabel>
              <Select
                name="ocorrencia"
                placeholder="Descreva a Ocorrência"
                disabled={isNew}
                onChange={handleOcorrenciaChange}
                value={ocorrencia}
              >
                {categorias.map((categoria, index) => (
                  <option key={index} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </Select>
            </FormControl>

            <br />
            <Center>{/* Strike Buttons */}</Center>
          </form>
          <Center>
            <Grid templateColumns="auto 1fr" gap={4} alignItems="center">
              {nome && isClient && (
                <Image
                  src={getImagemPorNome(nome)}
                  alt={nome}
                  boxSize="200px"
                  objectFit="cover"
                />
              )}
              <div>
                <Text>Meliante: {nome}</Text>
                <Text>BO: {ocorrencia}</Text>
                <Text>Valor do Strike: {strikeValue}</Text>
              </div>
            </Grid>
          </Center>
          <NumberInput
            value={strikeValue}
            min={0}
            onChange={handleStrikeValueChange}
          >
            <FormControl>
              <FormLabel>Valor do Strike</FormLabel>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </FormControl>
          </NumberInput>

          <InputGroup size="md" mb={5}>
            <InputLeftAddon size="md">Observação</InputLeftAddon>
            <Input
              size="md"
              id="test1"
              maxLength={150}
              value={observationsStrike}
              onChange={(event) => setObservationsStrike(event.target.value)}
            ></Input>
          </InputGroup>

          <Button
            type="submit"
            colorScheme="teal"
            disabled={isNew}
            onClick={apiCall}
          >
            Enviar
          </Button>
        </Stack>
      </Center>
      <br />
      <Center>
        {isSent && isClient && <Text color="green.500">Meliante Fichado!</Text>}
        {isSent && isClient && (
          <Button
            type="submit"
            colorScheme="teal"
            disabled={isNew}
            onClick={Clean}
          >
            Novo BO
          </Button>
        )}
      </Center>
      <br />
      <Center>
        <Stack spacing={4}>
          <Heading as="h1" size="xl">
            Ordenado Por Mau Comportamento
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}></Grid>
        </Stack>
      </Center>
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
              <Text>{item._id}</Text>
              <Text>{item.totalStrikePoints}</Text>
            </Box>
          ))}
        </Grid>
      </Center>
    </ChakraProvider>
  );
}
