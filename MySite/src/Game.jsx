import React from 'react';
import './Game.css';

const Game = () => {
  return (
    <div className="game-screen"> {/* Fundo do site (Preto) */}
      <div className="monitor-frame"> {/* Moldura do Monitor */}
        <div className="game-world"> {/* O ecrã cinza onde o jogo corre */}
          
          <div className="score-board">SCORE: 00000</div>
          
          <div className="character"></div>

          <div className="ground-line">
            <div className="obstacle tree"></div>
            <div className="obstacle mountain"></div>
          </div>

        </div>
      </div>
      <div className="scroll-hint">Scroll down for CV</div>
    </div>
  );
};

export default Game;