import React, { useState } from "react";
import firebase from "../../config/firebase";
import "firebase/auth";
import "./sigup.css";
import Nav from '../../components/nav/nav'

export default function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msgType, setMsgType] = useState();
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);

  function signup() {
    setLoading(true);
    setMsgType(null);

    if (!email || !password) {
      setMsgType("Error");
      setMsg("Informe o e-mail e senha!");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        setMsgType("Success");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setMsgType("Error");
        switch (error.message) {
          case "Password should be at least 6 characters":
            setMsg("A senha deve ter pelo menos 6 caracteres");
            break;
          case "The email address is badly formatted.":
            setMsg("O formato do seu email é inválido!");
            break;
          case "The email address is already in use by another account.":
            setMsg("Este email já está sendo utilizado por outro usuário!");
            break;
          default:
            setMsg("Não foi possível cadastrar. Tente novamento mais tarde!");
            break;
        }
      });
  }

  return (
    <React.Fragment>
      <Nav/>
      <div className="form-signup">
      <form className="text-center form-login mx-auto mt-5">
        <h1 className="h3 mb-3 text-black font-weght-bold">Cadastro</h1>

        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          className="form-control my-2"
          placeholder="E-mail"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          className="form-control my-2"
          placeholder="Senha"
        />
        {!loading ? (
          <button
            onClick={signup}
            type="button"
            className="btn btn-lg btn-block mt-3 mb-5 btn-signup"
          >
            Cadastrar
          </button>
        ) : (
          <div class="spinner-border text-danger" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
        <div className="msg-login text-black text-center my-4">
          {msgType === "Success" && (
            <span>
              <strong>Wow!</strong> Usuário cadastrado com sucesso!
            </span>
          )}
          {msgType === "Error" && (
            <span>
              <strong>Ops!</strong> {msg}
            </span>
          )}
        </div>
      </form>
    </div>
    </React.Fragment>
  );
}
