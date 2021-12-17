import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { HouseFill } from 'react-bootstrap-icons';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/Users");
  }, [user, loading,history]);
  return (
    <div className="login">
      <div className="login__container">
      <h1><HouseFill /></h1>
        <label for="loginmail" className="login__label" >Usuario:</label>
        <input
          type="text"
          id="loginmail"
          className="login__textBox form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <label for="loginmail" className="login__label" >Contraseña:</label>
        <input
          type="password"
          className="login__textBox form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Acceder
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Acceder con Google
        </button>
        <div>
          <Link to="/reset">Olvidé mi contraseña</Link>
        </div>
        <div>
          No tienes una cuenta? <Link to="/Register">Regístrate</Link> ahora.
        </div>
      </div>
    </div>
  );
}
export default Login;