import styled from "styled-components";

export const TextArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  h2 {
    font-size: 1.5em;
    margin: 10px 0;
  }

  textarea {
    background: none;
    border: none;
    font-size: 0.9rem;
    cursor: pointer;
  }

  textarea::placeholder {
    color: #ccc;
  }

  textarea:focus {
    outline: 0;
  }
`;

export const ContainerForm = styled.form`
  max-width: 50%;

  button {
    padding: 8px;
    font-size: 1.2rem;
    margin-top: 10px;
  }
`;

export const InitialInputForm = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const UserIdentification = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 200px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ContainerIput = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 50%;

  span {
    font-size: 0.8rem;
    color: #ccc;
  }
`;

export const ImgUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  width: 50%;
  height: 90%;
  display: flex;
  text-align: center;

  h3 {
    font-size: 1.2rem;
  }

  p {
    font-size: 0.8rem;
    margin-bottom: 8px;
  }

  label {
    display: block;
    cursor: pointer;
  }

  input {
    display: none;
  }

  img {
    margin: 0 auto;
    display: block;
    width: 90%;
    text-align: center;
  }
`;

export const ConatinerInputAddressAndJob = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  margin-bottom: 8px;

  span {
    font-size: 0.8rem;
    color: #ccc;
  }
`;

export const ContainerButtons = styled.div`
  width: 300px;
  width: 30%;
  display: flex;
  justify-content: space-around;
`;

export const ContainerErrorMessage = styled.p`
  color: #cf0e0e;
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
`;
