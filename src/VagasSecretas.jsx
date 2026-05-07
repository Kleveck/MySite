import React, { useState, useEffect } from 'react';
import initialJobs from './vagas.json';

const VagasSecretas = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const savedStates = JSON.parse(localStorage.getItem('vagas_estados') || '{}');
    const savedDates = JSON.parse(localStorage.getItem('vagas_datas_mudanca') || '{}');
    
    const updatedJobs = initialJobs.map(job => ({
      ...job,
      estado: savedStates[job.id] || 'disponivel',
      data_movimentacao: savedDates[job.id] || null
    }));
    
    setJobs(updatedJobs);
  }, []);

  const alterarEstado = (id, novoEstado) => {
    const savedStates = JSON.parse(localStorage.getItem('vagas_estados') || '{}');
    const savedDates = JSON.parse(localStorage.getItem('vagas_datas_mudanca') || '{}');
    
    const estadoAtual = savedStates[id] || 'disponivel';
    const estadoFinal = estadoAtual === novoEstado ? 'disponivel' : novoEstado;
    const dataHoje = new Date().toLocaleDateString('pt-PT');

    // Atualiza Estados
    const novosEstados = { ...savedStates, [id]: estadoFinal };
    localStorage.setItem('vagas_estados', JSON.stringify(novosEstados));

    // Atualiza Datas (apenas se não estiver a voltar para 'disponivel')
    const novasDatas = { ...savedDates, [id]: estadoFinal !== 'disponivel' ? dataHoje : null };
    localStorage.setItem('vagas_datas_mudanca', JSON.stringify(novasDatas));

    setJobs(prev => prev.map(j => 
      j.id === id ? { ...j, estado: estadoFinal, data_movimentacao: novasDatas[id] } : j
    ));
  };

  const darkTheme = {
    background: '#121212',
    card: '#1e1e1e',
    text: '#e0e0e0',
    accent: '#ec922a',
    border: '#333'
  };

  const ColunaVagas = ({ titulo, lista, corDestaque }) => {
    if (lista.length === 0) return null;

    return (
      <div style={{ flex: 1, minWidth: '300px', backgroundColor: darkTheme.card, borderRadius: '12px', padding: '15px', border: `1px solid ${darkTheme.border}` }}>
        <h3 style={{ borderBottom: `2px solid ${corDestaque}`, paddingBottom: '10px', color: corDestaque }}>
          {titulo} ({lista.length})
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
          {lista.map(job => (
            <div key={job.id} style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#2a2a2a', border: `1px solid ${darkTheme.border}` }}>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{job.titulo}</div>
              <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>{job.empresa}</div>
              
              {/* EXIBIÇÃO DAS DATAS */}
              <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '10px' }}>
                <div>Encontrada: {job.data_scraped || '---'}</div>
                {job.data_movimentacao && (
                   <div style={{ color: corDestaque }}>Movida: {job.data_movimentacao}</div>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a href={job.link} target="_blank" rel="noreferrer" style={{ padding: '5px 10px', borderRadius: '4px', backgroundColor: darkTheme.accent, color: '#000', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  Link
                </a>
                
                <button 
                  onClick={() => alterarEstado(job.id, 'aplicado')}
                  style={{ padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', border: 'none', backgroundColor: job.estado === 'aplicado' ? '#4CAF50' : '#444', color: 'white', fontSize: '0.8rem' }}
                >
                  {job.estado === 'aplicado' ? '✓ Aplicado' : 'Candidatar'}
                </button>

                <button 
                  onClick={() => alterarEstado(job.id, 'arquivado')}
                  style={{ padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', border: 'none', backgroundColor: job.estado === 'arquivado' ? '#f44336' : '#444', color: 'white', fontSize: '0.8rem' }}
                >
                  {job.estado === 'arquivado' ? 'Ignorar' : 'Sem Interesse'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const vagasDisponiveis = jobs.filter(j => j.estado === 'disponivel');
  const vagasAplicadas = jobs.filter(j => j.estado === 'aplicado');
  const vagasArquivadas = jobs.filter(j => j.estado === 'arquivado');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkTheme.background, color: darkTheme.text, padding: '30px', fontFamily: 'Segoe UI, Roboto, sans-serif' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: darkTheme.accent }}>Job Hunter Dashboard</h1>
      </header>

      <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <ColunaVagas titulo="Novas Oportunidades" lista={vagasDisponiveis} corDestaque="#ec922a" />
        <ColunaVagas titulo="Candidaturas Feitas" lista={vagasAplicadas} corDestaque="#03dac6" />
        <ColunaVagas titulo="Sem Interesse" lista={vagasArquivadas} corDestaque="#cf6679" />
      </div>
    </div>
  );
};

export default VagasSecretas;