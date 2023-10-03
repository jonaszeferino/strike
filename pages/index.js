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
  Spinner,
  Switch
} from "@chakra-ui/react";
import { supabase } from "../utils/supabaseClient";

import ScreenshotCapture from '../components/ScreenshotCapture';


export default function StrikeManager() {
  const [isClient, setIsClient] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [nome, setNome] = useState("Glacial");
  const [ocorrencia, setOcorrencia] = useState("");
  const [ocorrenciaBoa, setOcorrenciaBoa] = useState("");
  const [strikeValue, setStrikeValue] = useState(0);
  const [goalsValue, setGoalsValue] = useState(0);
  const [isNew, setIsNew] = useState(false);
  const [observationsStrike, setObservationsStrike] = useState("");
  const [observationsGoals, setObservationsGoals] = useState("");
  const [strikeSaveValues, setStrikeSaveValues] = useState([]);
  const [goalsSaveValues, setGoalsSaveValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEnable, setIsEnable] = useState(false);

  const [bad, setBad] = useState(true);
  const [good, setGood] = useState(false);
  const [session, setSession] = useState(false);
  const [siLoading, setIsLoading] = useState(false);

  const [isGood, setIsGood] = useState(true);

  const handleToggle = () => {
    if (!isGood) {
      handleClickGood();
    } else {
      handleClickBad();
    }
    setIsGood(!isGood);
  };


  useEffect(() => {
    setIsClient(true);
    apiStrikes();
    apiGoals();

    if (isClient) {
    }
  }, [isClient]);

  const apiStrikes = async () => {
    setLoading(true);
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
      setLoading(false);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const apiGoals = async () => {
    setLoading(true);
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
      setLoading(false);

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
    {
      value: "Eduardo",
      label: "Eduardo",
      imagem: "/imagens/eduardo.jpg",
    },
  ];

  const categorias = [
    "Arrogância",
    "Bullying",
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

  const categoriasGoals = [
    "Exemplo de cidadão",
    "Amante dos animais",
    "Anti Clubista",
    "Falou mal do Boston",
    "Desconstruído",
    "Inocente",
    "Humilde",
    "Amorosidade",
    "Altruísta",
    "Contribuiu para o bem Estar do Grupo",
    "Desculpas Honestas",
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
          strikePoints: strikeValue ? strikeValue : 1 ,
          observations: observationsStrike,
          user_email: session?.user?.email || "strikemanager@gmail.com"
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

  const apiCallGood = async () => {
    setIsNew(true);
    try {
      const response = await fetch("/api/v1/putGoalsManager", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nome,
          incidents: ocorrenciaBoa,
          goals: goalsValue ? goalsValue : 1 ,
          observationsGoals: observationsGoals,
          user_email: session?.user?.email || "strikemanager@gmail.com"
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

  const handleOcorrenciaBoaChange = (event) => {
    setOcorrenciaBoa(event.target.value);
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

  const handleGoalsValueChange = (value) => {
    setGoalsValue(value);
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
    setGoalsValue(0);
    setObservationsGoals("");
    setOcorrenciaBoa("");
  };

  const handleScreenshot = () => {
    alert(
      "Para tirar uma captura de tela, use a função nativa do seu dispositivo. Não seja Preguiçoso, Silvio Santos era Camelô e agora é Bilionário"
    );
  };

  const handleClickGood = () => {
    setGood(true);
    setBad(false);
  };

  const handleClickBad = () => {
    setBad(true);
    setGood(false);
  };

  useEffect(() => {
    let mounted = true;
    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        if (session) {
          setSession(session);
        }
        setIsLoading(false);
      }
    }
    getInitialSession();
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);


  // screenShopt

  

  return (
    <ChakraProvider>
      <>
        <Center>
          <ChakraProvider>
            {session ? (
              <p>
                Usuário: {session.user.email} <br />
                <Center>
                  <Button
                    onClick={() => supabase.auth.signOut()}
                    colorScheme="red"
                    size="sm"
                  >
                    Sair
                  </Button>
                </Center>
              </p>
            ) : null}
            {/* Resto do seu código */}
          </ChakraProvider>
        </Center>
      </>
      

      <br />
      <Center>
        <Stack direction="row" spacing={4} align="center">
        <Switch size="lg" onChange={handleToggle} isChecked={isGood} colorScheme="purple">
        {isGood ? "Bem feitorias" : "Marginalidade"}
      </Switch>
        </Stack>
      </Center>

      {good ? (
        <>
          {/* //BOM */}
          <Center>
            <Stack spacing={4} width="600px" margin="20px">
              <Heading as="h1" size="xl">
                Cidadãos de Bem
              </Heading>
              <form onSubmit={handleSubmit} method="post">
                <FormControl>
                  <FormLabel>Bem feitor</FormLabel>
                  <Select
                    name="nome"
                    placeholder="Selecione o ser de Luz"
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
                  <FormLabel>Capital social</FormLabel>
                  <Select
                    name="ocorrencia"
                    placeholder="Descreva a Ocorrência"
                    disabled={isNew}
                    onChange={handleOcorrenciaBoaChange}
                    value={ocorrenciaBoa}
                  >
                    {categoriasGoals.map((categoriaBoa, index) => (
                      <option key={index} value={categoriaBoa}>
                        {categoriaBoa}
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
                    <Text>Cidadão de Bem: {nome}</Text>
                    <Text>Bela Atitude: {ocorrencia}</Text>
                    <Text>Valor do Ball: {goalsValue}</Text>
                  </div>
                </Grid>
              </Center>
              <NumberInput
                value={goalsValue}
                min={0}
                onChange={handleGoalsValueChange}
              >
                <FormControl>
                  <FormLabel>Valor do Ball</FormLabel>
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
                  value={observationsGoals}
                  onChange={(event) => setObservationsGoals(event.target.value)}
                ></Input>
              </InputGroup>

              <Button
                type="submit"
                colorScheme="teal"
                disabled={isEnable}
                onClick={apiCallGood}
              >
                Enviar
              </Button>
            </Stack>
          </Center>
          <Center>
            <div>
              {/* Conteúdo da sua página */}
              {/* <Button onClick={handleScreenshot}>Capturar Screenshot</Button> */}
            </div>
          </Center>
          <br />
          <Center>
            {isSent && isClient && (
              <Text color="green.500">Cidadão Agraciado</Text>
            )}
            {isSent && isClient && (
              <Button
                type="submit"
                colorScheme="teal"
                disabled={isNew}
                onClick={Clean}
              >
                Novo Goal
              </Button>
            )}
          </Center>
          <br />
          <Center>
            <Stack spacing={4} margin="20px">
              <Heading as="h1" size="xl">
                Ordenado Por Bom Cidadão
              </Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}></Grid>
            </Stack>
          </Center>
          <Center>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {goalsSaveValues.map((item) => (
                <Box
                  key={item._id}
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  textAlign="center"
                >
                  <Text>{item._id}</Text>
                  <Text>{item.totalGoals}</Text>
                </Box>
              ))}
            </Grid>
          </Center>
          <Box>
            <br />
          </Box>
        </>
      ) : null}

      {bad ? (
        <>
          <Center>
            <Stack spacing={4} width="600px" margin="20px">
              <Heading as="h1" size="xl">
                Cidadãos de Conduta Questionável
              </Heading>
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
                  onChange={(event) =>
                    setObservationsStrike(event.target.value)
                  }
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
          <Center>
            <div>
              {/* Conteúdo da sua página */}
              {/* <Button onClick={handleScreenshot}>Capturar Screenshot</Button> */}
            </div>
          </Center>
          <br />
          <Center>
            {isSent && isClient && (
              <Text color="green.500">Meliante Fichado!</Text>
            )}
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
            <Stack spacing={4} margin="20px">
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
          <Box>
            <br />
          </Box>
        </>
      ) : null}
    </ChakraProvider>
  );
}
