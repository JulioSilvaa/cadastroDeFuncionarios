import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuthentication } from "hooks/useAuthentication";
import { useForm } from "react-hook-form";
import { FaLockOpen } from "react-icons/fa";
import { useNavigate } from "react-router";
import Container from "styles/Container";
import { strongpassword } from "utils/validations";
import * as yup from "yup";
import * as S from "./style";

const schema = yup
  .object()
  .shape({
    password: yup
      .string()
      .matches(strongpassword, "No minimo 6 caracteres")
      .trim()
      .required("Campo obrigatório"),
    email: yup.string().email("E-mail inválido.").required("Campo obrigatório"),
  })
  .required();

function FormLogin() {
  const navigate = useNavigate();
  const { login, error } = useAuthentication();

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = (data) => {
    login(data);
    navigate("/");
  };

  return (
    <Container>
      <S.ContainerForm onSubmit={onSubmit(handleSubmitForm)}>
        <S.InitialInputForm>
          <h2>
            Login <FaLockOpen color="gray" size={20} />
          </h2>
          <S.UserIdentification>
            <S.ContainerIput>
              <div>
                <TextField
                  required
                  {...register("email", { required: true })}
                  label="Email"
                  type={"email"}
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
                {errors.email ? (
                  <S.ContainerErrorMessage>{error}</S.ContainerErrorMessage>
                ) : (
                  <span>ex: Julio@email.com</span>
                )}
              </div>
              <div>
                <TextField
                  required
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
        <S.ContainerButtons>
          <Button type="submit" variant="contained">
            LOGIN
          </Button>
          <Button
            onClick={() => navigate("/registro")}
            type="submit"
            variant="contained"
            color="error"
          >
            REGISTRAR
          </Button>
        </S.ContainerButtons>
      </S.ContainerForm>
    </Container>
  );
}

export default FormLogin;
