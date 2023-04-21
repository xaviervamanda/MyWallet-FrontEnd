import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import axios from "axios";

export default function SignUpPage() {

  const {url, setName, setPassword, setEmail, 
    password, name, email} = useContext(UserContext);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleForm(e){
    e.preventDefault();
    if (password !== confirmPassword){
      return window.alert("Digite senhas iguais nos dois campos de senhas!")
    }
    axios.post(`${url}/sign-up`, {name, email, password})
      .then(() => navigate("/"))
      .catch(err => {
        window.alert(err.response.data);
      })
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleForm}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" 
        onChange={e => setName(e.target.value)}
        required/>
        <input placeholder="E-mail" type="email" 
        onChange={e => setEmail(e.target.value)}
        required/>
        <input placeholder="Senha" type="password"  
        onChange={e => setPassword(e.target.value)}
        required/>
        <input placeholder="Confirme a senha" type="password"  
        onChange={e => setConfirmPassword(e.target.value)}
        required/>
        <button>Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
