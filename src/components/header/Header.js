import logo from "assets/logo.png";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo da empresa" />
      </div>
      <div className={styles.title}>
        <span>PASSO 2 DE 6</span>
        <h1>Informações de contato</h1>
      </div>
    </header>
  );
};

export default Header;
