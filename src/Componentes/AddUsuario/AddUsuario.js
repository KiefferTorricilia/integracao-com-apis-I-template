import axios from "axios";
import React, { useEffect, useState } from "react";

function AddUsuario(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const criarUsuario = () => {
    const headers = {
      headers: {
        Authorization: "kieffer-torricilia-barbosa"
      }
    }

    const body = {
      name: nome,
      email: email,
    }

    axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users`, body, headers)
    .then((resposta) => {
      alert("Pessoa adicionada com sucesso")
      setNome("")
      setEmail("")
      props.pegarTodosOsUsuarios()
      
    })
    .catch((erro) => {
      console.log(erro)
    })
  }



  return (
    <>
      <p>Adicionar novo usuario</p>
      <input
        placeholder={"nome"}
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder={"email"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={() => criarUsuario(nome, email)} >Enviar</button>
    </>
  );
}

export default AddUsuario;
