import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cvData } from './data'
import Game from './Game'
import './App.css'
import { Link } from 'react-router-dom';
import VagasSecretas from './VagasSecretas'

function App() {
  const [lang, setLang] = useState('en')
  const t = cvData[lang]

  return (
    <Router>
      <Routes>
        <Route path="/vagas" element={<VagasSecretas />} />
        <Route
          path="/"
          element={
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
                    <img
                      src="/images/Foto.png"
                      alt="Marco Marcelo"
                      className="profile-pic"
                    />
                    <h1>{t.name}</h1>
                    <p>{t.contact}</p>
                  </motion.div>
                </header>
                <footer style={{ textAlign: 'center', padding: '40px 20px', opacity: 0.5, fontSize: '0.9rem' }}>
                  <Link to="/vagas" style={{ color: 'inherit', textDecoration: 'none' }}>
                    © 2026 Marco Marcelo
                  </Link>
                </footer>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;