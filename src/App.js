import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState } from "react"
import UserContext from "./contexts/UserContext";


export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const url = process.env.REACT_APP_API_URL;

  return (
    <PagesContainer>
      <UserContext.Provider value={{email, setEmail, 
      name, setName, password, setPassword,
      token, setToken, url}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />}/>
          <Route path="/home" element={<HomePage />}/>
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage />}/>
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
