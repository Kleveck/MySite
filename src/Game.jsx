import React from 'react';
import './Game.css';

const Game = () => {
  return (
    <div className="game-screen">
      {" "}
      {/* Fundo do site (Preto) */}
      <div className="monitor-frame">
        {" "}
        {/* Moldura do Monitor */}
        <div className="game-world">
          <div className="celestial-body"></div>
          <div className="score-board">SCORE: 00000</div>

          {/* GRUPO 1: O Bosque (4 ou 5 árvores) */}
          <div className="bg-group forest-group">
            <div className="tree-container size-sm">
              {" "}
              <div className="tree-top"></div>
              <div className="tree-trunk"></div>{" "}
            </div>
            <div className="tree-container size-md">
              {" "}
              <div className="tree-top"></div>
              <div className="tree-trunk"></div>{" "}
            </div>
            <div className="tree-container size-lg">
              {" "}
              <div className="tree-top"></div>
              <div className="tree-trunk"></div>{" "}
            </div>
            <div className="tree-container size-sm">
              {" "}
              <div className="tree-top"></div>
              <div className="tree-trunk"></div>{" "}
            </div>
          </div>

          {/* GRUPO 2: Montanha + Espaço + Árvore Isolada */}
          <div className="bg-group mountain-island">
            <div className="mountain"></div>
            <div className="tree-container size-md isolated-tree">
              <div className="tree-top"></div>
              <div className="tree-trunk"></div>
            </div>
          </div>

          <div className="character"></div>
          <div className="ground-line"></div>
        </div>
      </div>
      <div className="scroll-hint">Scroll down for CV</div>
    </div>
  );
};

export default Game;