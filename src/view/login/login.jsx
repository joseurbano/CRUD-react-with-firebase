import React, { useState } from "react";
import "./login.css";
import firebase from "../../config/firebase";
import "firebase/auth";
import { Link, Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msgType, setMsgType] = useState();

  const dispatch = useDispatch();

  function logar() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        setMsgType("Success");
        dispatch({ type: "LOG_IN", userEmail: result.user.email });
      })
      .catch((error) => {
        setMsgType("Error");
      });
  }

  

  return (
    <div className="login-content d-flex align-item-center ">

      {
        useSelector((state) => state.userIsLogged) === 1 ? (
        <Redirect to="/" />
        ) : null
      }

      <form className="form-signin mx-auto">
        <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">
          Login
        </h1>

        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          id="inputEmail"
          className="form-control my-2"
          placeholder="E-mail"
        />

        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          id="inputPassword"
          className="form-control my-2"
          placeholder="Senha"
        />
        <button
          className="btn btn-lg btn-login btn-block"
          type="button"
          onClick={logar}
        >
          Entrar
        </button>

        <div className="msg-login text-white text-center my-4">
          {msgType === "Success" && (
            <span>
              <strong>Wow!</strong> Você está conectado!
            </span>
          )}
          {msgType === "Error" && (
            <span>
              <strong>Ops!</strong> Verifique se a senha ou usuário estão
              corretos!
            </span>
          )}
        </div>

        <div className="options-login mt-4 text-center">
          <a href="/" className="mx-2">
            Recuperar senha
          </a>
          <Link to="/signup" className="mx-2">
            Cadastrar
          </Link>
        </div>
      </form>
    </div>
  );
}
