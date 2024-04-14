import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {
  BoxRegister,
  Container,
  RegisterText,
  ContainerFormRegister,
} from "./styles";
import toast from "react-hot-toast";
import isValidEmail from "../../utils/isValidEmail";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClickRegister = async () => {
    if (!email || !isValidEmail(email))
      toast.error("Preencha o email corretamente.");

    if (!name) toast.error("Preencha o nome corretamente.");

    if (!password) toast.error("Preencha a senha corretamente.");

    try {
      await api.post("/register", { name, email, password });

      toast.success(
        "Usuário criado com sucesso! Redirecionando para o login em 3,2,1..."
      );

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error("Usuário já existente.");
      } else {
        toast.error(
          "Ops! Algo deu errado, estamos trabalhando para corrigir o mais rápido possível."
        );
      }
    }
  };

  return (
    <Container>
      <BoxRegister>
        <RegisterText>Registrar-se</RegisterText>
        <ContainerFormRegister onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button onClick={handleClickRegister} type="submit">
            REGISTRAR-SE
          </Button>
        </ContainerFormRegister>
      </BoxRegister>
    </Container>
  );
};

export default Register;
