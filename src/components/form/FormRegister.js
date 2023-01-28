import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuthentication } from "hooks/useAuthentication";
import useForm from "hooks/useForm";
import { FaLockOpen } from "react-icons/fa";
import Container from "styles/Container";
import * as S from "./style";

function FormRegister() {
  const { createUser } = useAuthentication();

  const [form, onChange] = useForm({
    email: "",
    password: "",
    displayName: "",
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const user = form;

    const res = await createUser(user);
  };
  return (
    <Container>
      <S.ContainerForm onSubmit={handleSubmitForm}>
        <S.InitialInputForm>
          <h2>
            Cadastro de usuário <FaLockOpen color="gray" size={20} />
          </h2>
          <S.UserIdentification>
            <S.ContainerIput>
              <div>
                <TextField
                  id="filled-basic"
                  value={form.displayName}
                  onChange={onChange}
                  name={"displayName"}
                  label="displayName"
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
                  value={form.email}
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
                  value={form.password}
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
        <div>
          <Button type="submit" variant="contained">
            CADASTRAR
          </Button>
        </div>
      </S.ContainerForm>
    </Container>
  );
}

export default FormRegister;