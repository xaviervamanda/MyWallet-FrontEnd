import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import TransactionsList from "../components/TransactionsList";
import axios from "axios";
import loading from "../assets/loading.gif";

export default function HomePage() {

  const {url} = useContext(UserContext);
  const [transactionsInfos, setTransactionsInfos] = useState(null);
  const [incomings, setIncomings] = useState(0);
  const [outgoings, setOutgoings] = useState(0);
  const navigate = useNavigate();
  let name = "";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token){
      navigate("/");
    }
    axios.get(`${url}/transactions`, {headers: {Authorization: `Bearer ${token}`}})
      .then((res) => {
        let incomings = 0;
        let outgoings = 0;
        res.data.forEach((t) => {
          t.value = Number(t.value).toFixed(2);
          if (t.type === "incoming") {
            incomings += t.value;
          } else {
            outgoings += t.value;
          }
        });
        setTransactionsInfos(res.data);
        setIncomings(incomings);
        setOutgoings(outgoings);
      })
      .catch((err) => window.alert(err.response.data));

  }, []);

  if (transactionsInfos === null){
    return (
      <LoadingGif>
        <img src={loading} alt="loading" />
      </LoadingGif>
    )
  }

  function handleButtonTransaction (type){
    navigate(`/nova-transacao/${type}`);
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {localStorage.getItem("name")}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          <TransactionsList transactionsInfos={transactionsInfos}/>
          
        </ul>

        {transactionsInfos.length === 0 ? (
          <NoTransactions>
            Não há registros de entrada ou saída
          </NoTransactions>
        ) : (
          <article>
            <strong>Saldo</strong>
            <Value color={incomings > outgoings || incomings === outgoings ? "positivo" : "negativo"}>
              {incomings > outgoings || incomings === outgoings ? (incomings - outgoings).toFixed(2) : (outgoings - incomings).toFixed(2)}
            </Value>
          </article>
        )}
        
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => handleButtonTransaction("entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => handleButtonTransaction("saída")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  ul{
    overflow-y: scroll;
    margin-bottom: 10px;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const NoTransactions = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  margin: 30% auto;
  width: 180px;
  text-align: center;
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const LoadingGif = styled.div`
    width: 100px;
    height: 100px;
    margin: 0 auto;
    margin-top: 200px;
    img{
        width: 50px;
        height: 50px;
    }
`