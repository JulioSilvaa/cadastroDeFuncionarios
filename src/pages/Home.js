import FomrEmployees from "components/form/FomrEmployees";
import Header from "components/header/Header";
import EmployeesList from "./EmployeesList";

export default function Home() {
  return (
    <>
      <Header />
      <FomrEmployees />
      <EmployeesList />
    </>
  );
}
