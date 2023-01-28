import FomrEmployees from "components/form/FomrEmployees";
import Header from "components/header/Header";

function CreateDocEmployees() {
  return (
    <>
      <Header title={"Adicionando novo colaborador"} />
      <FomrEmployees />
    </>
  );
}

export default CreateDocEmployees;
