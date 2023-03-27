import React, { useEffect, useState } from "react";
import AddUsuario from "./Componentes/AddUsuario/AddUsuario";
import Usuario from "./Componentes/Usuario/Usuario";
import axios from "axios";




function App() {
  const [usuarios, setUsuarios] = useState([])

  const pegarTodosOsUsuarios = () => {
    const headers = {
      headers: {
        Authorization: "kieffer-torricilia-barbosa"
      }
    }

    const url = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users"

    axios.get(url, headers)
    .then((resposta) => {
      setUsuarios(resposta.data)})
    .catch((erro) =>{
      console.log(erro)})
  }

  

  useEffect(() => {
    pegarTodosOsUsuarios()
  }, [])


  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
      <AddUsuario pegarTodosOsUsuarios={pegarTodosOsUsuarios} />
      {usuarios.map((usuario) => {
        return <Usuario key={usuario.id} usuario={usuario} id={usuario.id} pegarTodosOsUsuarios={pegarTodosOsUsuarios} />
      })}
    </>
  )
}

export default App;

