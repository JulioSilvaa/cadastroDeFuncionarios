import { Avatar, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useAuthValue } from "context/AuthContext";
import { useFetchEmployeeshDoc } from "hooks/useFetchEmployeesDocuments";
import moment from "moment/moment";
import { useNavigate } from "react-router";

export default function EmployeesList() {
  const { user } = useAuthValue();
  moment.locale("br");
  const navigate = useNavigate();

  const { documents: employees } = useFetchEmployeeshDoc("funcionarios");

  const employee = employees && employees;
  const rows = employee;

  const columns = [
    {
      field: "images",
      headerName: "Photo",
      width: 70,
      renderCell: (params) => (
        <Tooltip title={params.row.firstname}>
          <Avatar src={params.row.image} />
        </Tooltip>
      ),
      sortable: false,
      filterable: false,
    },
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
    { field: "sector", headerName: "Setor", width: 100 },
    { field: "birthdate", headerName: "Data de Nascimento", width: 130 },
    { field: "startOfContract", headerName: "Início de contrato", width: 130 },
    { field: "telephone", headerName: "Telefone", width: 130 },
    { field: "description", headerName: "Descrição", width: 200 },
    {
      field: "createdBy",
      headerName: "Adicionado por:",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Adicionado em:",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt.seconds * 1000).format("DD-MM-YYYY"),
    },
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
          rowSpacingType={"margin"}
          color={{ color: "blue" }}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
        {user ? (
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
        ) : (
          ""
        )}
      </div>
    );
}
