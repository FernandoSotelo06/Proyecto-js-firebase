import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // El estado de autenticación se gestionará automáticamente en `App.jsx`
    } catch (err) {
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="login-container" style={styles.container}>
      <h1 style={styles.title}>Iniciar Sesión</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "50px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
};

export default Login;
