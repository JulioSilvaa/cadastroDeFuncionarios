import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

//hooks
import { useEffect, useState } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanUP
  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkifIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //register
  const createUser = async (data) => {
    checkifIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.displayName });

      setLoading(false);

      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert variant="filled" severity="success">
          Cadastrado com sucesso!
        </Alert>
      </Stack>;
      return user;
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("Password ")) {
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="info">
            A senha precisa conter no minímo 6 caracteres
          </Alert>
        </Stack>;
      } else if (error.message.includes("email-already")) {
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="warning">
            E-mail já cadastrado
          </Alert>
        </Stack>;
      } else {
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            "Ocorreu um erro tente mais tarde
          </Alert>
        </Stack>;
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  //logout - sign Out

  const logout = () => {
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert variant="filled" severity="info">
        Saindo !
      </Alert>
    </Stack>;
    checkifIsCancelled();

    signOut(auth);
  };

  //login - sign In

  const login = async (data) => {
    checkifIsCancelled();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert variant="filled" severity="success">
          Usuário encontrado!
        </Alert>
      </Stack>;
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            Usuário não encontrado
          </Alert>
        </Stack>;
      } else if (error.message.includes("wrong-password")) {
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="info">
            A senha incorreta
          </Alert>
        </Stack>;
      } else {
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            Ocorreu um Erro, por favor tente novamente mais tarde
          </Alert>
        </Stack>;
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, createUser, error, loading, logout, login };
};
