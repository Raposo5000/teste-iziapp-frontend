import { BoxLogin, Container, ContainerFormLogin, RegisterText, WelcomeText } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../contexts/authContext";
import { useDispatch } from "react-redux";
import { setUserName } from "../../redux/slices/userSlice";
import isValidEmail from "../../utils/isValidEmail";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuth();

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleClickLogin = async () => {
    if(!email || !isValidEmail(email)) toast.error("Preencha o email corretamente.");

    if(!password) toast.error("Preencha a senha corretamente.");

    try {
      const { data, status } = await api.post("/login", {
        email,
        password,
      });

      if (status === 200) {
        login(data.token);
        dispatch(setUserName(data.name))
        navigate("/dashboard");
      }

    } catch (error) {
      toast.error("Usuário inválido.");
    }
  };

  return (
    <Container>
      <BoxLogin>
        <WelcomeText>Bem vindo</WelcomeText>
        <ContainerFormLogin onSubmit={(e) => e.preventDefault()}>
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
          <Button onClick={handleClickLogin} type="submit">LOGIN</Button>
          <RegisterText onClick={() => navigate("/register")}>Registrar-se</RegisterText>
        </ContainerFormLogin>
      </BoxLogin>
    </Container>
  );
};

export default Login;
