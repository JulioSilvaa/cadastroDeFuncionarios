import logo from "assets/logo.png";
import { useAuthentication } from "hooks/useAuthentication";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ title }) => {
  const { logout } = useAuthentication();
  return (
    <header className={styles.header}>
      <Link to={"/"} className={styles.logo}>
        <img src={logo} alt="logo da empresa" />
      </Link>
      <div className={styles.title}>
        <span>PASSO 2 DE 6</span>
        <h1>{title ? title : "Informações de contato"}</h1>
      </div>
      <div style={{ alignContent: "end" }}>
        <Link to={"/login"}>Login</Link>
      </div>
      <button onClick={logout}>Sair</button>
    </header>
  );
};

export default Header;
