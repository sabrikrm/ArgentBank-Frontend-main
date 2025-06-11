import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../state/Authentification/authSlice";

// error est récupéré depuis Redux pour afficher le message d'erreur.
// handleSubmit envoie l’email et le mot de passe à Redux et va déclencher `loginUser` défini dans `authSlice`.
// Si la connexion réussit, l’utilisateur est **redirigé vers `/profile`

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Definei state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState("");

  const { error } = useSelector((state) => state.auth); // pour récupérer l’éventuelle erreur stockée dans Redux.

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(""); // 

    if (!email || !password) {
      setFormError("Veuillez entrer votre email et votre mot de passe.");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <main className="main bg-dark ">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
        {formError && <p className="error-message">{formError}</p>}
        {error && <p className="error-message">{error}</p>}
      </section>
    </main>
  );
};

export default Login;
