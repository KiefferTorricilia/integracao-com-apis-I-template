import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const User = styled.div`
  border: black 1px solid;
  margin-top: 10px;
  width: 350px;
`
function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  const pegarUsuarioPeloId = () => {
    const headers = {
      headers: {
        Authorization: "kieffer-torricilia-barbosa"
      }
    }

    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`, headers)
    .then((resposta) => {
      setEmail(resposta.data.email)
    })
    .catch((erro) => {
      console.log(erro)
    })
  }

  useEffect(() => {
    pegarUsuarioPeloId()
  }, [])

  const modificaUsuario = () => {
    const headers = {
      headers: {
        Authorization: "kieffer-torricilia-barbosa"
      }
    }

    const body = {
      name: nome,
      email: email,
    }
    
    axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`, body, headers)
    .then((resposta) => {
      console.log(resposta)
      props.pegarTodosOsUsuarios()
    })
    .catch((erro) => {
      console.log(erro)
    })

  }

  const deletaUsuario = () => {
    const headers = {
      headers: {
        Authorization: "kieffer-torricilia-barbosa"
      }
    }

    axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${props.id}`, headers)
    .then((resposta) => {
      console.log(resposta)
    })
    .catch((erro) => {
      console.log(erro)
    })
  }


  return (
    <User>
      {editar ? (
        <div>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={() => modificaUsuario()} >Enviar alterações</button>
        </div>
      ) : (
        <>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{email}</p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={() => deletaUsuario()} >Excluir</button>
    </User>
  );
}

export default Usuario;
