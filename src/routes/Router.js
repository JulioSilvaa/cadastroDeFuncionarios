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
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navigate, Outlet } from "react-router-dom";

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

  function ProtectedRoutes() {
    if (!user) {
      <h1>Usuário não está logado</h1>;
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
  }

  return (
    <AuthProvider value={{ user }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/adicionando" element={<CreateDocEmployees />} />
            <Route path="/editando/:id" element={<EditPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Router;
