import { useState } from 'react'
import { motion } from 'framer-motion'
import { cvData } from './data'
import Game from './Game'; 
import './App.css'
import VagasSecretas from './VagasSecretas';

// 1. IMPORTAR AS FERRAMENTAS DE ROTA
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [lang, setLang] = useState('en')
  const t = cvData[lang]

  // Conteúdo Original do teu Portfolio (extraído para manter o código limpo)
  const PortfolioPrincipal = () => (
    <div className="portfolio-wrapper">
      <nav className="lang-nav" style={{ zIndex: 100 }}>
        <button onClick={() => setLang("en")}>EN</button>
        <button onClick={() => setLang("pt")}>PT</button>
      </nav>
      
      <section id="hero-game">
        <Game />
      </section>

      <div className="portfolio-container">
         <header className="hero-section">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <img src="/images/Foto.png" alt="Marco Marcelo" className="profile-pic" />
              <h1>{t.name}</h1>
              <p>{t.contact}</p> 
            </motion.div>
         </header>

         <main>
           {/* Perfil, Experiência, etc. */}
         </main>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* ROTA 1: O teu site atual (Raiz) */}
        <Route path="/" element={<PortfolioPrincipal />} />

        {/* ROTA 2: A tua página de vagas secreta */}
        <Route path="/vagas" element={<VagasSecretas />} />
      </Routes>
    </Router>
  );
}

export default App;