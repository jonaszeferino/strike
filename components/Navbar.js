import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import Auth from "../components/Auth";
import { FaTimes } from "react-icons/fa";
import {
  Box,
  Button,
  Input,
  Text,
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [session, setSession] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [isOpenModdal, setIsOpenModal] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        if (session) {
          setSession(session);
          setIsOpenModal(false); // Feche o modal quando a sessão estiver ativa
        }
        setIsLoading(false);
      }
    }
    getInitialSession();
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);

        if (session) {
          onClose();
          setIsOpenModal(false); // Feche o modal quando a sessão estiver ativa
        } else {
          setIsOpenModal(true); // Abra o modal quando a sessão não estiver ativa
        }
      }
    );
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const handleLoginButtonClick = () => {
    onOpen();
  };

  return (
    <ul className={styles.navbar}>
      <li>
        <Link href="/">
          <a>| Home</a>
        </Link>
      </li>
      <li>
        <Link href="/strikesDetails">
          <a>| Detalhes</a>
        </Link>
      </li>
      <button onClick={handleLoginButtonClick}>Login</button>

      <Modal isOpen={isOpenModdal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent style={{ background: "white" }}>
          <ModalHeader>
            Login
            <IconButton
              icon={<FaTimes />}
              colorScheme="gray"
              variant="ghost"
              ml="auto"
              onClick={onClose}
            />
          </ModalHeader>
          <ModalBody>
            <Auth onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ul>
  );
}
