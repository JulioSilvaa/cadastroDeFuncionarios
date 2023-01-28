import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Header from "components/header/Header";
import { useDeleteDocument } from "hooks/useDeleteDocEmployee";
import { useFetchDocument } from "hooks/useEfecthEmployeeDocument";
import useForm from "hooks/useForm";
import { useUpdateDocument } from "hooks/useUpdateDocument";

import {
  FaCalendarAlt,
  FaFileContract,
  FaLightbulb,
  FaPencilAlt,
  FaRegQuestionCircle,
  FaUserAlt,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import Container from "styles/Container";
import * as S from "./style";

import { useAuthValue } from "context/AuthContext";
export default function EditPage() {
  // Usando o Hook para pegar o parametro passaro por URL
  const { id } = useParams();

  // usando o Hook para pegar o Profile do Funcionário
  const { document } = useFetchDocument("funcionarios", id);

  // Hook que realizado o envio do Form para UPDATE
  const { updateDocument } = useUpdateDocument("funcionarios");

  //Hook para excluir arquivo
  const { deleteDocument } = useDeleteDocument("funcionarios");

  const { user } = useAuthValue();
  const navigate = useNavigate();

  console.log(document);

  const [form, onChange] = useForm({
    firstname: "",
    lastname: "",
    job: "",
    address: "",
    telephone: "",
    email: "",
    nationality: "",
    birthdate: "",
    description: "",
    sector: "",
    wage: "",
    startOfContract: "",
    image: "",
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const data = { ...form, uid: user.uid, createdBy: user.displayName };
    updateDocument(id, data);

    navigate("/");
  };

  return (
    <>
      <Header
        title={`Editando dados de ${document.firstname} ${document.lastname} `}
      />
      <Container>
        <S.ContainerForm onSubmit={handleSubmitForm}>
          <S.TextArea>
            <label htmlfor="texta">
              <h2>Fale-nos um pouco sobre você </h2>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                id="texta"
                cols="58"
                rows="4"
                placeholder="Diga quem você é, como os empregados podem entrar em contato com você e qual a sua profissão"
              />
            </label>
          </S.TextArea>
          <S.InitialInputForm>
            <h2>
              Alterar as informação de contato{" "}
              <FaPencilAlt color="gray" size={20} />
            </h2>

            <S.UserIdentification>
              <S.ContainerIput>
                <div>
                  <TextField
                    id="filled-basic"
                    value={form.firstname}
                    onChange={onChange}
                    name={"firstname"}
                    label="Nome"
                    variant="filled"
                    autoComplete="off"
                    fullWidth
                    size="small"
                    aria-readonly="true"
                  />
                  <span>ex: Julio</span>
                </div>
                <div>
                  <TextField
                    id="filled-basic"
                    label="Sobrenome"
                    value={form.lastname}
                    name={"lastname"}
                    onChange={onChange}
                    variant="filled"
                    autoComplete="off"
                    fullWidth
                    size="small"
                  />
                  <span>ex: Silva</span>
                </div>
              </S.ContainerIput>
              <S.ImgUser>
                <h3>
                  Foto de perfil <FaLightbulb color="gray" size={20} />
                </h3>
                <p>Alterar imagem do perfil </p>
                <label htmlfor="uploadImage">
                  <FaUserAlt size={80} color="gray" />
                </label>
                <input
                  type="file"
                  id="uploadImage"
                  name={"image"}
                  onChange={onChange}
                  value={form.image}
                />
              </S.ImgUser>
            </S.UserIdentification>
          </S.InitialInputForm>
          <S.ConatinerInputAddressAndJob>
            <div>
              <TextField
                id="filled-basic"
                label="Cargo"
                value={form.job}
                name={"job"}
                onChange={onChange}
                variant="filled"
                autoComplete="off"
                fullWidth
                size="small"
              />
              <span>ex: Vendedor</span>
            </div>
            <div>
              <TextField
                id="filled-basic"
                label="Setor"
                value={form.sector}
                name={"sector"}
                onChange={onChange}
                variant="filled"
                autoComplete="off"
                fullWidth
                size="small"
              />
              <span>ex: Assistência Técnica</span>
            </div>
            <div>
              <TextField
                id="filled-basic"
                label="Endereço"
                value={form.address}
                name={"address"}
                onChange={onChange}
                variant="filled"
                autoComplete="off"
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaRegQuestionCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <span>ex: Avenida Paulista, 1.234 - São Paulo - SP - 02323</span>
            </div>
          </S.ConatinerInputAddressAndJob>
          <div style={{ display: "flex", gap: "10px" }}>
            <S.ContainerIput>
              <div>
                <TextField
                  id="filled-basic"
                  label="Telefone"
                  value={form.telephone}
                  name={"telephone"}
                  onChange={onChange}
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
                <span>ex: (16)9 9999-9999</span>
              </div>
              <div>
                <TextField
                  id="filled-basic"
                  label="Nacionalidade"
                  value={form.nationality}
                  name={"nationality"}
                  onChange={onChange}
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
                <span>ex: Brasileira</span>
              </div>
              <div>
                <TextField
                  id="filled-basic"
                  label="Início de contrato"
                  value={form.startOfContract}
                  name={"startOfContract"}
                  onChange={onChange}
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  size="small"
                  type={"date"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaFileContract />
                      </InputAdornment>
                    ),
                  }}
                />
                <span>ex: 01/01/2222</span>
              </div>
            </S.ContainerIput>
            <S.ContainerIput>
              <div>
                <TextField
                  id="filled-basic"
                  label="Email"
                  type={"email"}
                  value={form.email}
                  name={"email"}
                  onChange={onChange}
                  pattern={"[ a-zA-Z ] { 3, } @ [ a-zA-Z ] { } [ ] 1 { } a-Z"}
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
                <span>ex: julio.silva@email.com</span>
              </div>
              <div>
                <TextField
                  id="filled-basic"
                  label="Salario"
                  type={"number"}
                  value={form.wage}
                  name={"wage"}
                  onChange={onChange}
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
                <span>ex: 2.000,00</span>
              </div>
              <div>
                <TextField
                  id="filled-basic"
                  label="Data de nascimento"
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  value={form.birthdate}
                  name={"birthdate"}
                  onChange={onChange}
                  size="small"
                  type={"date"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaCalendarAlt />
                      </InputAdornment>
                    ),
                  }}
                />
                <span>ex: 30/02/1999</span>
              </div>
            </S.ContainerIput>
          </div>
          <S.ContainerButtons>
            <Button type="submit" variant="contained">
              EDITAR DADOS
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              GERAR PDF
            </Button>
            <Button
              onClick={() => {
                deleteDocument(id);
                navigate("/");
              }}
              variant="contained"
              color="error"
            >
              DELETAR
            </Button>
          </S.ContainerButtons>
        </S.ContainerForm>
      </Container>
    </>
  );
}
