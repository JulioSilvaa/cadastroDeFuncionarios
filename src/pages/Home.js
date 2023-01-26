import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Header from "components/header/Header";
import {
  FaCalendarAlt,
  FaPencilAlt,
  FaRegQuestionCircle,
  FaUserAlt,
} from "react-icons/fa";
import Container from "styles/Container";
import * as S from "./style";

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <main>
          <S.ContainerForm>
            <S.TextArea>
              <label>
                <h2>Fale-nos um pouco sobre você </h2>
                <textarea
                  name=""
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
                Informação de contato <FaPencilAlt color="gray" />
              </h2>

              <S.UserIdentification>
                <S.ContainerIput>
                  <div>
                    <TextField
                      id="filled-basic"
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
                      variant="filled"
                      autoComplete="off"
                      fullWidth
                      size="small"
                    />
                    <span>ex: Silva</span>
                  </div>
                </S.ContainerIput>
                <S.ImgUser>
                  <h3>Foto de perfil</h3>
                  <p>Adicione uma imagem para o seu perfil</p>
                  <label for="uploadImage">
                    <FaUserAlt size={90} color="gray" />
                  </label>
                  <input type="file" id="uploadImage" />
                </S.ImgUser>
              </S.UserIdentification>
            </S.InitialInputForm>
            <S.ConatinerInputAddressAndJob>
              <div>
                <TextField
                  id="filled-basic"
                  label="Emprego"
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
                <span>
                  ex: Avenida Paulista, 1.234 - São Paulo - SP - 02323
                </span>
              </div>
            </S.ConatinerInputAddressAndJob>
            <div style={{ display: "flex", gap: "10px" }}>
              <S.ContainerIput>
                <div>
                  <TextField
                    id="filled-basic"
                    label="Telefone"
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
                    size="small"
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
          </S.ContainerForm>
        </main>
      </Container>
    </>
  );
}
