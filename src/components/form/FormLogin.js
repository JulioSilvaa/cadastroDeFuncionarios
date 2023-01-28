import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuthentication } from "hooks/useAuthentication";
import useForm from "hooks/useForm";
import { FaLockOpen } from "react-icons/fa";
import { useNavigate } from "react-router";
import Container from "styles/Container";
import * as S from "./style";

function FormLogin() {
  const navigate = useNavigate();
  const { login } = useAuthentication();

  const [form, onChange] = useForm({
    email: "",
    password: "",
  });
  async function handleSubmitForm(e) {
    e.preventDefault();
    login(form);
    navigate("/");
  }

  return (
    <Container>
      <S.ContainerForm onSubmit={handleSubmitForm}>
        <S.InitialInputForm>
          <h2>
            Login <FaLockOpen color="gray" size={20} />
          </h2>

          <S.UserIdentification>
            <S.ContainerIput>
              <div>
                <TextField
                  id="filled-basic"
                  value={form.firstname}
                  onChange={onChange}
                  name={"email"}
                  label="Email"
                  type={"email"}
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
                <span>ex: Julio@email.com</span>
              </div>
              <div>
                <TextField
                  id="filled-basic"
                  label="Senha"
                  value={form.passwor}
                  name={"password"}
                  onChange={onChange}
                  type={"password"}
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
                <span>ex: asarwe12</span>
              </div>
            </S.ContainerIput>
          </S.UserIdentification>
        </S.InitialInputForm>

        <Button type="submit" variant="contained">
          LOGIN
        </Button>
      </S.ContainerForm>
    </Container>
  );
}

export default FormLogin;
