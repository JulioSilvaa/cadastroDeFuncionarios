import Button from "@mui/material/Button";
import logo from "assets/logo.png";
import { useAuthentication } from "hooks/useAuthentication";
import { Link, useNavigate } from "react-router-dom";

import { useAuthValue } from "context/AuthContext";
import styles from "./Header.module.css";

const Header = ({ title }) => {
  const navigate = useNavigate();
  const { user } = useAuthValue();

  const { logout } = useAuthentication();
  return (
    <header className={styles.header}>
      <Link to={"/"} className={styles.logo}>
        <img src={logo} alt="logo da empresa" />
      </Link>
      <div className={styles.title}>
        <div>
          <span>PASSO 2 DE 6</span>
          <h1>{title ? title : "Informações de contato"}</h1>
        </div>
        <div className={styles.containerLinks}>
          <Button
            onClick={() => navigate("/")}
            type="submit"
            variant="contained"
          >
            HOME
          </Button>
          {!user ? (
            <Button
              onClick={() => navigate("/login")}
              type="submit"
              variant="contained"
            >
              LOGIN
            </Button>
          ) : (
            <Button
              onClick={logout}
              type="submit"
              variant="contained"
              color="error"
            >
              LOGOUT
            </Button>
          )}
          {user ? <p>Bem vindo!! {user.displayName}</p> : ""}
        </div>
      </div>
    </header>
  );
};

export default Header;
