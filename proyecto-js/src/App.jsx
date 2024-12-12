import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import ContactForm from "./ContactForm";
import Forum from "./Forum";
import Slider from "./Slider";
import { Gallery } from "./Gallery";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica si el usuario está autenticado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <>
          <header style={{ textAlign: "center", margin: "20px 0" }}>
            <h1>Inteligencia Artificial</h1>
            <p>Explorando el futuro de la tecnología</p>
          </header>
          <Slider />
          {/* Sección informativa sobre la IA */}
          <section style={{ padding: "20px" }}>
            <h2>¿Qué es la Inteligencia Artificial?</h2>
            <p>
              La Inteligencia Artificial (IA) es un campo de la informática que
              se ocupa de crear sistemas capaces de realizar tareas que normalmente
              requieren inteligencia humana. Estas tareas incluyen el razonamiento,
              el aprendizaje, la comprensión del lenguaje, la percepción visual y
              la toma de decisiones.
            </p>

            <h3>Tipos de Inteligencia Artificial</h3>
            <ul>
              <li><strong>IA débil:</strong> Se refiere a sistemas diseñados para realizar tareas específicas sin tener conciencia ni intenciones propias. Un ejemplo sería un asistente virtual como Siri o Alexa.</li>
              <li><strong>IA fuerte:</strong> Teóricamente, sería un sistema capaz de realizar cualquier tarea cognitiva humana. Aún no se ha logrado desarrollar una IA fuerte.</li>
            </ul>

            <h3>Aplicaciones de la IA</h3>
            <p>
              La IA tiene una amplia gama de aplicaciones en diversas industrias,
              como la medicina, la educación, la automoción, la seguridad y la
              atención al cliente. Algunas de las aplicaciones más comunes incluyen:
            </p>
            <ul>
              <li>Diagnóstico médico asistido por IA</li>
              <li>Automóviles autónomos</li>
              <li>Recomendaciones personalizadas (como en Netflix o Amazon)</li>
              <li>Reconocimiento de voz y procesamiento de lenguaje natural</li>
            </ul>

            <h3>Desafíos y Oportunidades</h3>
            <p>
              A pesar de sus grandes avances, la IA aún enfrenta varios desafíos,
              como la ética en su implementación, el sesgo en los algoritmos, y las
              preocupaciones sobre el empleo y la automatización. Sin embargo, la
              IA también ofrece enormes oportunidades para mejorar la vida humana
              y resolver problemas globales complejos.
            </p>
          </section>

          {/* Otros componentes */}

          <Forum />
          <Gallery />
          <ContactForm />
          <footer className="footer">
            <p>Creado por:</p>
            <p>Fernando Adrian Sotelo Afa-Yohaldo Edmundo Vega Quinto</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
