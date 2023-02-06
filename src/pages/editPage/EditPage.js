import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Header from "components/header/Header";
import { useAuthValue } from "context/AuthContext";
import { useCreateHistory } from "hooks/useCreateHistory";
import { useDeleteDocument } from "hooks/useDeleteDocEmployee";
import { useFetchDocument } from "hooks/useEfecthEmployeeDocument";
import { useUpdateDocument } from "hooks/useUpdateDocument";
import useUploadImage from "hooks/useUploadImage";
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
import createPDF from "reports/CreatePDF";
import Container from "styles/Container";
import * as S from "./style";

export default function EditPage() {
  // Usando o Hook para pegar o parametro passaro por URL
  const { id } = useParams();
  // usando o Hook para pegar o Profile do Funcionário
  const { document } = useFetchDocument("funcionarios", id);
  // Hook que realizado o envio do Form para UPDATE
  const { updateDocument } = useUpdateDocument("funcionarios");
  //Hook para excluir arquivo
  const { deleteDocument } = useDeleteDocument("funcionarios");
  //Hook para criar um histórico da última atualização
  const { createHistory } = useCreateHistory("historico");

  const { user } = useAuthValue();
  const navigate = useNavigate();

  const [handleChange, imgURL] = useUploadImage();

  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
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
  const [endOfContract, setEndOfContract] = useState("");

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
    firstname,
    lastname,
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
    endOfContract,
    image,
    uid: user.uid,
    createdBy: user.displayName,
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (
      !firstname ||
      !lastname ||
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
      createHistory({
        dadosAntigos: [document],
        dadosNovos: {
          ...data,
          image: imgURL,
        },
      });

      updateDocument(id, {
        ...data,
        image: imgURL,
      });
      navigate("/");
    }
  };

  return (
    <>
      <Header title={`Editando dados de contado `} />
      <Container>
        <S.ContainerForm onSubmit={handleSubmitForm}>
          <S.TextArea>
            <label>
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
              {`Alterarando as informação de ${document.firstname} ${document.lastname} `}
              <FaPencilAlt color="gray" size={20} />
            </h2>

            <S.UserIdentification>
              <S.ContainerIput>
                <div>
                  <TextField
                    id="filled-basic"
                    value={firstname}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    name={"firstName"}
                    variant="outlined"
                    autoComplete="off"
                    fullWidth
                    size="small"
                  />
                  <span>ex: Julio</span>
                </div>
                <div>
                  <TextField
                    id="filled-basic"
                    value={lastname}
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
                <label>
                  {!imgURL && !image ? (
                    <FaUserAlt size={80} color="gray" />
                  ) : (
                    <img
                      style={{ width: "50%", borderRadius: "50%" }}
                      src={imgURL || image}
                      alt=""
                    />
                  )}
                  <input
                    type="file"
                    name={"image"}
                    onChange={(e) => {
                      handleChange(e);
                    }}
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
                <span>
                  ex:+55 (11) 98888-8888 / 9999-9999 / 21 98888-8888 /
                </span>
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
                <span>ex: 200.90 use ponto para centavos</span>
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
            <Button
              onClick={() => createPDF(document)}
              variant="contained"
              color="secondary"
            >
              GERAR PDF
            </Button>
            <Button
              onClick={() => {
                setEndOfContract(Date.now());
                alert("Contrato encerrado com sucesso!");
              }}
              type="submit"
              variant="contained"
              color="warning"
            >
              ENCERRAR CONTRATO
            </Button>
          </S.ContainerButtons>
        </S.ContainerForm>
        <S.ContainerButtons></S.ContainerButtons>
      </Container>
    </>
  );
}
