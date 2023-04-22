import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default function TransactionsPage() {

  const {setDescription, setValue, token, value, description, url} = useContext(UserContext);
  const {tipo: type} = useParams();
  const navigate = useNavigate();

  function saveTransaction(e, type){
    e.preventDefault();
    if (type === "entrada"){
      axios.post(`${url}/transaction/incoming`, { value, description}, {headers: {Authorization: `Bearer ${token}`}})
        .then(() => navigate("/home"))
        .catch((err) => window.alert(err.response.data))
    } else {
      axios.post(`${url}/transaction/outgoing`, { value, description}, {headers: {Authorization: `Bearer ${token}`}})
        .then(() => navigate("/home"))
        .catch((err) => window.alert(err.response.data))
    }
  }

  return (
    <TransactionsContainer>
      <h1>Nova {type}</h1>
      <form onSubmit={(e) => saveTransaction(e, type)}>
        <input placeholder="Valor" 
        type="text"
        onChange={e => setValue(e.target.value)} 
        required/>
        <input placeholder="Descrição" 
        type="text"
        onChange={e => setDescription(e.target.value)} 
        required/>
        <button>Salvar {type}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
