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
  const [strikeSaveValuesDetails, setStrikeSaveValuesDetails] = useState([]);

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

  const apiStrikesDetails = async () => {
    console.log("apiStrikes called");
    try {
      const response = await fetch("/api/v1/getStrikeValuesDetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nome
        }),


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

  return (
    <ChakraProvider>
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
      <Image
        src={getImagemPorNome(item._id)}
        alt={item._id}
        boxSize="264px"
        objectFit="cover"
      />
      <Text>{item._id}</Text>
      <Text>{item.totalStrikePoints}</Text>
    </Box>
  ))}
</Grid>
      </Center>
    </ChakraProvider>
  );
}
