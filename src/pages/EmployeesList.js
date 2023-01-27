import { DataGrid } from "@mui/x-data-grid";
import { useFetchEmployeeshDoc } from "hooks/useFetchEmployeesDoc";

export default function EmployeesList() {
  const { documents: employees } = useFetchEmployeeshDoc("funcionarios");

  const employee = employees && employees;
  const rows = employee;

  const columns = [
    { field: "firstname", headerName: "Nome", width: 130 },
    { field: "lastname", headerName: "Sobrenome", width: 130 },
    {
      field: "age",
      headerName: "idade",
      type: "number",
      width: 70,
    },
    { field: "job", headerName: "Cargo", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "nationality", headerName: "Nacionalidade", width: 200 },
    { field: "sector", headerName: "Setor", width: 200 },
    { field: "wage", headerName: "Salário", width: 130 },
    { field: "birthdate", headerName: "Data de Nascimento", width: 130 },
    { field: "startOfContract", headerName: "Início de contrato", width: 130 },
    { field: "telephone", headerName: "Telefone", width: 130 },
    { field: "description", headerName: "Descrição", width: 300 },
  ];

  function getid(e) {
    console.log(e.row);
  }

  if (rows)
    return (
      <div style={{ height: 400, width: "90%", margin: "20px auto" }}>
        <DataGrid
          onRowClick={getid}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[6]}
        />
      </div>
    );
}
