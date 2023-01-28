import { AuthProvider } from "context/AuthContext";

//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "hooks/useAuthentication";
import CreateDocEmployees from "pages/CreateDocEmployees";

//pages
import EditPage from "pages/editPage/EditPage";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/register/Register";
//Hooks
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function Router() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  const loadingUser = user === undefined;

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <AuthProvider value={{ user }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to={"/"} />}
          />
          <Route path="/registro" element={!user ? <Register /> : <Login />} />
          <Route
            path="/adicionando"
            element={user ? <CreateDocEmployees /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/editando/:id"
            element={user ? <EditPage /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Router;
