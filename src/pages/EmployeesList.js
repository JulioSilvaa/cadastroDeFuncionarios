import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchEmployeeshDoc } from "hooks/useFetchEmployeesDocuments";
import { useNavigate } from "react-router";

export default function EmployeesList() {
  const navigate = useNavigate();

  const { documents: employees } = useFetchEmployeeshDoc("funcionarios");

  const employee = employees && employees;
  const rows = employee;

  const columns = [
    { field: "image", headerName: "Imagem", width: 200 },
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
    { field: "birthdate", headerName: "Data de Nascimento", width: 130 },
    { field: "startOfContract", headerName: "Início de contrato", width: 130 },
    { field: "telephone", headerName: "Telefone", width: 130 },
    { field: "description", headerName: "Descrição", width: 300 },
  ];

  function getid(e) {
    navigate(`editando/${e.id}`);
  }

  if (rows)
    return (
      <div style={{ height: 400, width: "90%", margin: "20px auto" }}>
        <DataGrid
          onRowClick={getid}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
        <div style={{ margin: "20px auto" }}>
          <Button
            onClick={() => {
              navigate("/adicionando");
            }}
            aut
            variant="contained"
            color="primary"
          >
            ADICIONAR FUNCIONARIO
          </Button>
        </div>
      </div>
    );
}
