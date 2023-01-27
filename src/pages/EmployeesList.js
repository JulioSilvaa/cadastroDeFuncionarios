import { useFetchEmployeeshDoc } from "hooks/useFetchEmployeesDoc";

export default function EmployeesList() {
  const { documents: employees } = useFetchEmployeeshDoc("funcionarios");

  const employee = employees?.map((item) => (
    <li>
      {item.firstname}
      <img src={item.image} alt="" />
    </li>
  ));

  console.log(employees);

  return (
    <div>
      <ul>{employee}</ul>
    </div>
  );
}
