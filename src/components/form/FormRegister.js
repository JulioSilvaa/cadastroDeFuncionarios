import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuthentication } from "hooks/useAuthentication";
import { useForm } from "react-hook-form";
import { FaLockOpen } from "react-icons/fa";
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
      .trim()
      .required("Campo obrigatório")
      .matches(
        strongpassword,
        "A senha deve conter pelo menos 8 caracteres, uma maiúscula, um número e um caractere especial"
      ),

    email: yup.string().email("E-mail inválido.").required("Campo obrigatório"),
  })
  .required();

function FormRegister() {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = (data) => {
    console.log(data);

    const user = data;

    return createUser(user);
  };

  const { createUser } = useAuthentication();

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
                  <S.ContainerErrorMessage>
                    {errors.displayName.message}
                  </S.ContainerErrorMessage>
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
                  <span>ex: sarwe2A!</span>
                )}
              </div>
            </S.ContainerIput>
          </S.UserIdentification>
        </S.InitialInputForm>
        <div style={{ marginTop: "50px" }}>
          <Button type="submit" variant="contained">
            CADASTRAR
          </Button>
        </div>
      </S.ContainerForm>
    </Container>
  );
}

export default FormRegister;
