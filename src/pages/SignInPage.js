import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext} from "react"
import axios from "axios"
import UserContext from "../contexts/UserContext"

export default function SignInPage() {

  const {url, setEmail, 
    setPassword, email, password} = useContext(UserContext);

  const navigate = useNavigate();

  function handleForm (e){
    e.preventDefault();
    axios.post(`${url}/login`, {email, password})
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name)
        navigate("/home");
      })
      .catch(err => {
        if (err.response.status === 422) return window.alert("O email deve ter um formato válido");
        if (err.response.status === 404) return window.alert("O email inserido não foi cadastrado. Faça o cadastro.");
        if (err.response.status === 401) return window.alert("A senha inserida está incorreta.");
      })
  }
    return (
    <SingInContainer>
      <form onSubmit={handleForm}>
        <MyWalletLogo />
        <input
        onChange={e => setEmail(e.target.value)}
        placeholder="E-mail" 
        type="email"
        required />
        <input
        onChange={e => setPassword(e.target.value)}
        placeholder="Senha" 
        type="password" 
        required />
        <button>Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
