import { useState } from 'react'
import { motion } from 'framer-motion'
import { cvData } from './data'
import Game from './Game'; // No return do App.jsx:
import './App.css'
import VagasSecretas from './VagasSecretas';
// ... no Router ...
<Route path="/vagas" element={<VagasSecretas />} />


function App() {
  const [lang, setLang] = useState('en')
  const t = cvData[lang]

  return (
    <div className="portfolio-wrapper">
      {/* Botões fixos para não sumirem no scroll */}
      <nav className="lang-nav" style={{ zIndex: 100 }}>
        <button onClick={() => setLang("en")}>EN</button>
        <button onClick={() => setLang("pt")}>PT</button>
      </nav>
      
      {/* O Jogo agora é a secção inicial completa */}
      <section id="hero-game">
        <Game />
      </section>

      {/* O Conteúdo do CV aparece depois do jogo */}
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
           {/* Perfil, Experiência, etc. (como já tinhas) */}
         </main>
      </div>
    </div>
  );
}
export default App;