import { Avatar, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useAuthValue } from "context/AuthContext";
import { useFetchEmployeeshDoc } from "hooks/useFetchEmployeesDocuments";
import moment from "moment/moment";
import { FaFilePdf } from "react-icons/fa";
import { useNavigate } from "react-router";
import createPDF from "reports/CreatePDF";
import * as S from "./style";

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
      headerName: "Foto",
      width: 70,
      renderCell: (params) => (
        <Tooltip title={params.row.firstname}>
          <Avatar src={params.row.image} />
        </Tooltip>
      ),
      sortable: false,
      filterable: false,
    },
    { field: "firstname", headerName: "Nome", width: 100 },
    { field: "lastname", headerName: "Sobrenome", width: 100 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "nationality", headerName: "Nacionalidade", width: 120 },
    { field: "sector", headerName: "Setor", width: 150 },
    { field: "job", headerName: "Cargo", width: 150 },
    { field: "telephone", headerName: "Telefone", width: 120 },
    { field: "description", headerName: "Descrição", width: 300 },
    {
      field: "wage",
      headerName: "Salário",
      width: 100,
      renderCell: (params) => {
        return Number(params.row.wage).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        });
      },
    },
    {
      field: "birthdate",
      headerName: "Nascido em :",
      width: 100,
      renderCell: (params) => moment(params.row.birthdate).format("DD-MM-YYYY"),
    },
    {
      field: "startOfContract",
      headerName: "Início de contrato",
      width: 130,
      renderCell: (params) =>
        moment(params.row.startOfContract).format("DD-MM-YYYY"),
    },
    {
      field: "endOfContract",
      headerName: "Contrato",
      width: 130,
      renderCell: (params) => {
        return params.row.endOfContract
          ? moment(params.row.endOfContract).format("DD-MM-YYYY")
          : " ATIVO";
      },
    },
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
    {
      headerName: "PDF",
      width: 80,
      renderCell: (params) => (
        <Button color="warning" onClick={() => createPDF(params.row)}>
          PDF <FaFilePdf />
        </Button>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  function getid(e) {
    navigate(`editando/${e.id}`);
  }

  if (rows)
    return (
      <S.ContainerTableInHome>
        <DataGrid
          onRowClick={getid}
          rows={rows}
          rowSpacingType={"border"}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
        {user ? (
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
        ) : (
          ""
        )}
      </S.ContainerTableInHome>
    );
}
