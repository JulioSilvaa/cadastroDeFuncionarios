import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useAuthValue } from "context/AuthContext";
import { useInsertEmployeeDoc } from "hooks/useInsertEmployeeDoc";
import { useForm } from "react-hook-form";
import {
  FaCalendarAlt,
  FaFileContract,
  FaLightbulb,
  FaPencilAlt,
  FaRegQuestionCircle,
  FaUserAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import Container from "styles/Container";
import * as yup from "yup";
import * as S from "./style";

import UploadImage from "hooks/useUploadImage";
import { telephoneNumber } from "utils/validations";

const schema = yup
  .object()
  .shape({
    description: yup
      .string()
      .max(500, "campo deve ser preenchido com ate 500 caracteres"),
    firstname: yup
      .string()
      .trim()
      .required("Campo obrigatório")
      .max(20, "Nome pode conter até 30 letras"),
    lastname: yup.string().lowercase().trim().required("Campo obrigatório"),
    job: yup.string().required("Campo obrigatório"),
    address: yup.string().required("Campo obrigatório"),
    telephone: yup
      .string()
      .matches(telephoneNumber, "não corresponde com padrão")
      .required("Campo obrigatório"),
    email: yup.string().email("E-mail inválido.").required("Campo obrigatório"),
    nationality: yup.string().required("Campo obrigatório"),
    birthdate: yup.string().required("Campo obrigatório"),
    sector: yup.string().required("Campo obrigatório"),
    wage: yup.string().required("Campo obrigatório"),
    startOfContract: yup.string().required("Campo obrigatório"),
    image: yup.string().notRequired(),
  })
  .required();

export default function FomrEmployees() {
  const { insertDocument } = useInsertEmployeeDoc("funcionarios");
  const [handleFileUpload, imgURL] = UploadImage();

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = (data) => {
    insertDocument({
      ...data,
      uid: user.uid,
      createdBy: user.displayName,
      image: imgURL,
    });
    navigate("/");
  };

  const { user } = useAuthValue();
  const navigate = useNavigate();

  return (
    <Container>
      <S.ContainerForm onSubmit={onSubmit(handleSubmitForm)}>
        <S.TextArea>
          <label>
            <h2>Fale-nos um pouco sobre você </h2>
            <textarea
              {...register("description")}
              id="texta"
              cols="58"
              rows="4"
              placeholder="Diga quem você é, como os empregados podem entrar em contato com você e qual a sua profissão"
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
                  {...register("firstname", { required: true })}
                  label="Nome"
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
                {errors.firstname ? (
                  <S.ContainerErrorMessage>
                    {errors.firstname.message}
                  </S.ContainerErrorMessage>
                ) : (
                  <span>ex: Julio</span>
                )}
              </div>
              <div>
                <TextField
                  {...register("lastname", { required: true })}
                  label="Sobrenome"
                  variant="filled"
                  autoComplete="off"
                  fullWidth
                  size="small"
                />
                {errors.lastname ? (
                  <S.ContainerErrorMessage>
                    {errors.lastname.message}
                  </S.ContainerErrorMessage>
                ) : (
                  <span>ex: Silva</span>
                )}
              </div>
            </S.ContainerIput>
            <S.ImgUser>
              <h3>
                Foto de perfil <FaLightbulb color="gray" size={20} />
              </h3>
              <p>Adicione uma imagem para o seu perfil </p>
              <label style={{ display: "block" }}>
                {!imgURL && <FaUserAlt size={90} color="gray" />}
                {imgURL && (
                  <img
                    style={{ width: "40%", borderRadius: "50%" }}
                    src={imgURL}
                    alt=""
                  />
                )}
                <input
                  type="file"
                  {...register("image")}
                  onChange={(e) => {
                    handleFileUpload(e);
                  }}
                />
              </label>
            </S.ImgUser>
          </S.UserIdentification>
        </S.InitialInputForm>
        <S.ConatinerInputAddressAndJob>
          <div>
            <TextField
              {...register("job", { required: true })}
              label="Cargo"
              variant="filled"
              autoComplete="off"
              fullWidth
              size="small"
              padding={"10px"}
            />
            {errors.job ? (
              <S.ContainerErrorMessage>
                {errors.job.message}
              </S.ContainerErrorMessage>
            ) : (
              <span>ex: Vendedor</span>
            )}
          </div>
          <div>
            <TextField
              {...register("sector", { required: true })}
              label="Setor"
              variant="filled"
              autoComplete="off"
              fullWidth
              size="small"
            />
            {errors.sector ? (
              <S.ContainerErrorMessage>
                {errors.sector.message}
              </S.ContainerErrorMessage>
            ) : (
              <span>ex: Assistência Técnica</span>
            )}
          </div>
          <div>
            <TextField
              {...register("address", { required: true })}
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
            {errors.address ? (
              <S.ContainerErrorMessage>
                {errors.address.message}
              </S.ContainerErrorMessage>
            ) : (
              <span>ex: Avenida Paulista, 1.234 - São Paulo - SP - 02323</span>
            )}
          </div>
        </S.ConatinerInputAddressAndJob>
        <div style={{ display: "flex", gap: "10px" }}>
          <S.ContainerIput>
            <div>
              <TextField
                {...register("telephone", {
                  required: true,
                })}
                label="Telefone"
                variant="filled"
                autoComplete="off"
                fullWidth
                size="small"
              />
              {errors.telephone ? (
                <S.ContainerErrorMessage>
                  {errors.telephone.message}
                </S.ContainerErrorMessage>
              ) : (
                <span>
                  ex:+55 (11) 98888-8888 / 9999-9999 / 21 98888-8888 /
                  5511988888888
                </span>
              )}
            </div>
            <div>
              <TextField
                {...register("nationality", { required: true })}
                label="Nacionalidade"
                variant="filled"
                autoComplete="off"
                fullWidth
                size="small"
              />
              {errors.nationality ? (
                <S.ContainerErrorMessage>
                  {errors.nationality.message}
                </S.ContainerErrorMessage>
              ) : (
                <span>ex: Brasileira</span>
              )}
            </div>
            <div>
              <TextField
                {...register("startOfContract", { required: true })}
                label="Início de contrato"
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
              {errors.startOfContract ? (
                <S.ContainerErrorMessage>
                  {errors.startOfContract.message}
                </S.ContainerErrorMessage>
              ) : (
                <span>ex: 01/01/2222</span>
              )}
            </div>
          </S.ContainerIput>
          <S.ContainerIput>
            <div>
              <TextField
                {...register("email", {
                  required: true,
                  pattern: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
                })}
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
                <span>ex: julio.silva@email.com</span>
              )}
            </div>
            <div>
              <TextField
                {...register("wage", { required: true })}
                label="Salario"
                type={"number"}
                variant="filled"
                autoComplete="off"
                fullWidth
                size="small"
              />
              {errors.wage ? (
                <S.ContainerErrorMessage>
                  {errors.wage.message}
                </S.ContainerErrorMessage>
              ) : (
                <span>ex: 200.90 use ponto para centavos</span>
              )}
            </div>
            <div>
              <TextField
                {...register("birthdate", { required: true })}
                label="Data de nascimento"
                variant="filled"
                autoComplete="off"
                fullWidth
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
              {errors.birthdate ? (
                <S.ContainerErrorMessage>
                  {errors.birthdate.message}
                </S.ContainerErrorMessage>
              ) : (
                <span>ex: 30/02/1999</span>
              )}
            </div>
          </S.ContainerIput>
        </div>
        <Button type="submit" variant="contained">
          ADICIONAR
        </Button>
      </S.ContainerForm>
    </Container>
  );
}
