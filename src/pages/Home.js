import Header from "components/header/Header";
import EmployeesList from "./EmployeesList";

export default function Home() {
  return (
    <>
      <Header />
      <h2 style={{ textAlign: "center", marginTop: "30px" }}>
        Clique sobre o campo do funcionário para editar
      </h2>
      <EmployeesList />
    </>
  );
}
