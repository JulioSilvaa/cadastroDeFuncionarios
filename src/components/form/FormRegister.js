import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuthentication } from "hooks/useAuthentication";
import { useForm } from "react-hook-form";
import { FaLockOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Container from "styles/Container";
import { strongpassword } from "utils/validations";
import * as yup from "yup";
import * as S from "./style";

const schema = yup
  .object()
  .shape({
    displayName: yup.string().trim().required("Digite um para o usuário"),
    password: yup
      .string()
      .matches(strongpassword, "No minimo 6 caracteres")
      .trim()
      .required("Campo obrigatório"),
    email: yup.string().email("E-mail inválido.").required("Campo obrigatório"),
  })
  .required();

function FormRegister() {
  const { createUser, error, loading } = useAuthentication();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = (data) => {
    const user = data;
    navigate("/login");

    return createUser(user);
  };

  return (
    <Container>
      <S.ContainerForm onSubmit={onSubmit(handleSubmitForm)}>
        <S.InitialInputForm>
          <h2 style={{ marginBottom: "20px" }}>
            Cadastro de usuário <FaLockOpen color="gray" size={20} />
          </h2>
          <S.UserIdentification>
            <S.ContainerIput>
              <div>
                <TextField
                  {...register("displayName", { required: true })}
                  label="Usário"
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
                {errors.displayName ? (
                  <S.ContainerErrorMessage>{error}</S.ContainerErrorMessage>
                ) : (
                  <span>ex: Usuário</span>
                )}
              </div>
              <div>
                <TextField
                  {...register("email", { required: true })}
                  label="Email"
                  type={"email"}
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
                {errors.email ? (
                  <S.ContainerErrorMessage>
                    {errors.email.message}
                  </S.ContainerErrorMessage>
                ) : (
                  <span>ex: Julio@email.com</span>
                )}
              </div>
              <div>
                <TextField
                  {...register("password", { required: true })}
                  label="Senha"
                  type={"password"}
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
                {errors.password ? (
                  <S.ContainerErrorMessage>
                    {errors.password.message}
                  </S.ContainerErrorMessage>
                ) : (
                  <span>ex: sarwe2</span>
                )}
              </div>
            </S.ContainerIput>
          </S.UserIdentification>
        </S.InitialInputForm>
        <div style={{ marginTop: "50px" }}>
          {!loading && (
            <Button type="submit" variant="contained">
              CADASTRAR
            </Button>
          )}
          {loading && (
            <Button type="submit" variant="contained">
              Aguard..
            </Button>
          )}
        </div>
      </S.ContainerForm>
    </Container>
  );
}

export default FormRegister;
