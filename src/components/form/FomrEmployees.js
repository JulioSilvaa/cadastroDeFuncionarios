import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import useForm from "hooks/useForm";
import { useInsertEmployeeDoc } from "hooks/useInsertEmployeeDoc";
import {
  FaCalendarAlt,
  FaLightbulb,
  FaPencilAlt,
  FaRegQuestionCircle,
  FaUserAlt,
} from "react-icons/fa";
import Container from "styles/Container";
import * as S from "./style";

export default function FomrEmployees() {
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
    image: "",
  });

  const { insertDocument } = useInsertEmployeeDoc("funcionarios");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    insertDocument(form);
  };

  return (
    <Container>
      <S.ContainerForm onSubmit={handleSubmitForm}>
        <S.TextArea>
          <label>
            <h2>Fale-nos um pouco sobre você </h2>
            <textarea
              required
              name="description"
              value={form.description}
              onChange={onChange}
              id=""
              cols="58"
              rows="4"
              placeholder="Diga quem você é, como os empregados podem entrar em contato com
        você e qual a sua profissão"
            />
          </label>
        </S.TextArea>
        <S.InitialInputForm>
          <h2>
            Informação de contato <FaPencilAlt color="gray" size={20} />
          </h2>

          <S.UserIdentification>
            <S.ContainerIput>
              <div>
                <TextField
                  required
                  id="filled-basic"
                  value={form.firstname}
                  onChange={onChange}
                  name={"firstname"}
                  label="Nome"
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  size="small"
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
              <p>Adicione uma imagem para o seu perfil </p>
              <label for="uploadImage">
                <FaUserAlt size={90} color="gray" />
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
              label="Emprego"
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
              <span>ex: 30 fev 1999</span>
            </div>
          </S.ContainerIput>
        </div>
        <button type="submit" variant="contained">
          ADICIONAR
        </button>
      </S.ContainerForm>
    </Container>
  );
}
