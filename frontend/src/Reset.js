import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "./firebase";
import { EnvelopeFill } from 'react-bootstrap-icons';
import "./Reset.css";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/ventas");
  }, [user, history,loading]);
  return (
    <div className="reset">
      <div className="reset__container">
      <h1><EnvelopeFill /></h1>
      <label className="reset__label" >Correo:</label>
        <input
          type="text"
          className="reset__textBox form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={() => sendPasswordResetEmail(email)}
        >
          Send password reset email
        </button>
        <div>
         No tienes una cuenta? <Link to="/register">Regístrate</Link> ahora.
        </div>
      </div>
    </div>
  );
}
export default Reset;