import React, { useState } from "react";
import { db } from "./firebase"; // Importa la configuración de Firebase
import { collection, addDoc } from "firebase/firestore";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      // Guardar en Firestore
      const docRef = await addDoc(collection(db, "contactMessages"), {
        name,
        email,
        message,
        timestamp: new Date(),
      });
      console.log("Mensaje enviado con ID: ", docRef.id);

      // Limpiar formulario y mostrar mensaje de éxito
      setName("");
      setEmail("");
      setMessage("");
      setStatus("Mensaje enviado correctamente.");
    } catch (error) {
      console.error("Error al enviar el mensaje: ", error);
      setStatus("Error al enviar el mensaje. Inténtalo de nuevo.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "1rem" }}>
      <h1>Contáctanos</h1>
      {status && <p style={{ color: status.includes("Error") ? "red" : "green" }}>{status}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ContactForm;
