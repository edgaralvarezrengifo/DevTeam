import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import { PersonSquare } from 'react-bootstrap-icons';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import "./Register.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/ventas");
  }, [user,history, loading]);
  return (
    <div className="register">
      <div className="register__container">
      <h1><PersonSquare /></h1>
      <label  className="register__label" >Nombre Completo:</label>
        <input
          type="text"
          className="register__textBox form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <label  className="register__label" >Email:</label>
        <input
          type="text"
          className="register__textBox form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <label  className="register__label" >Password:</label>
        <input
          type="password"
          className="register__textBox form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Regístrate
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
          >
            Regístrate con Google
          </button>
          <div>
           Ya tienes una cuenta? <Link to="/">Ingresa</Link> ahora.
          </div>
        </div>
      </div>
    );
  }
  export default Register;