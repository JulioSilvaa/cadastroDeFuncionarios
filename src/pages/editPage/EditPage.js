import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Header from "components/header/Header";
import { useDeleteDocument } from "hooks/useDeleteDocEmployee";
import { useFetchDocument } from "hooks/useEfecthEmployeeDocument";
import useForm from "hooks/useForm";
import { useUpdateDocument } from "hooks/useUpdateDocument";
import { useEffect, useState } from "react";
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
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [job, setJob] = useState();
  const [address, setAddress] = useState();
  const [telephone, setTelephone] = useState();
  const [email, setEmail] = useState();
  const [nationality, setNationality] = useState();
  const [birthdate, setBirthDate] = useState();
  const [description, setDescription] = useState();
  const [sector, setSector] = useState();
  const [wage, setWage] = useState();
  const [startOfContract, setStartOfContract] = useState();
  const [image, setImage] = useState();
  useEffect(() => {
    setFirstName(document.firstname);
    setLastName(document.lastname);
    setJob(document.job);
    setAddress(document.address);
    setTelephone(document.telephone);
    setEmail(document.email);
    setNationality(document.nationality);
    setBirthDate(document.birthdate);
    setDescription(document.description);
    setSector(document.sector);
    setWage(document.wage);
    setStartOfContract(document.startOfContract);
    setBirthDate(document.birthdate);
    setImage(document.image);
  }, [document]);
  const data = {
    firstName,
    lastName,
    job,
    address,
    telephone,
    email,
    nationality,
    birthdate,
    description,
    sector,
    wage,
    startOfContract,
    image,
    uid: user.uid,
    createdBy: user.displayName,
  };
  const [form, onChange] = useForm({ data });
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !job ||
      !address ||
      !telephone ||
      !email ||
      !nationality ||
      !birthdate ||
      !sector ||
      !wage ||
      !startOfContract
    ) {
      alert("Por favor preencha todos os campos");
    } else {
      updateDocument(id, data);
      navigate("/");
    }
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
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
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
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    name={"firstname"}
                    variant="outlined"
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
                    value={lastName}
                    name={"lastname"}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    variant="outlined"
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
                  <input
                    type="file"
                    id="uploadImage"
                    name={"image"}
                    onChange={onChange}
                    value={form.image}
                  />
                </label>
              </S.ImgUser>
            </S.UserIdentification>
          </S.InitialInputForm>
          <S.ConatinerInputAddressAndJob>
            <div>
              <TextField
                id="filled-basic"
                value={job}
                name={"job"}
                onChange={(e) => {
                  setJob(e.target.value);
                }}
                variant="outlined"
                autoComplete="off"
                fullWidth
                size="small"
              />
              <span>ex: Vendedor</span>
            </div>
            <div>
              <TextField
                id="filled-basic"
                value={sector}
                name={"sector"}
                onChange={(e) => {
                  setSector(e.target.value);
                }}
                variant="outlined"
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
                value={address}
                name={"address"}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                variant="outlined"
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
                  value={telephone}
                  name={"telephone"}
                  onChange={(e) => {
                    setTelephone(e.target.value);
                  }}
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
                <span>ex: (16)9 9999-9999</span>
              </div>
              <div>
                <TextField
                  id="filled-basic"
                  value={nationality}
                  name={"nationality"}
                  onChange={(e) => {
                    setNationality(e.target.value);
                  }}
                  variant="outlined"
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
                  value={startOfContract}
                  name={"startOfContract"}
                  onChange={(e) => {
                    setStartOfContract(e.target.value);
                  }}
                  variant="outlined"
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
                  type={"email"}
                  value={email}
                  name={"email"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  pattern={"[ a-zA-Z ] { 3, } @ [ a-zA-Z ] { } [ ] 1 { } a-Z"}
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
                <span>ex: julio.silva@email.com</span>
              </div>
              <div>
                <TextField
                  id="filled-basic"
                  type={"number"}
                  value={wage}
                  name={"wage"}
                  onChange={(e) => {
                    setWage(e.target.value);
                  }}
                  variant="outlined"
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
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  value={birthdate}
                  name={"birthdate"}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                  }}
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
