import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/alunos')
      .then(response => response.json())
      .then(data => setAlunos(data));
  }, []);

  // Função para adicionar novo aluno
  const adicionarAluno = (e) => {
    e.preventDefault();
    if (!nome.trim()) return;
    fetch('http://localhost:3000/alunos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome })
    })
      .then(response => response.json())
      .then(() => {
        setNome('');
        fetch('http://localhost:3000/alunos')
          .then(response => response.json())
          .then(data => setAlunos(data));
      });
  };

  // Função para deletar aluno
  const deletarAluno = (id) => {
    fetch(`http://localhost:3000/alunos/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        fetch('http://localhost:3000/alunos')
          .then(response => response.json())
          .then(data => setAlunos(data));
      })
      .catch(err => {
        alert('Erro ao deletar aluno: ' + err.message);
      });
  };

  return (
    <div className="App">
      <h1>Lista de Alunos</h1>
      <form onSubmit={adicionarAluno}>
        <input
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Digite o nome do aluno"
          required
        />
        <button type="submit">Adicionar</button>
      </form>
      <ol className='alunos-list'>
        {alunos.map(aluno => (
          <li key={aluno.id}>
            {aluno.nome}
            <button className='botao-deletar' onClick={() => deletarAluno(aluno.id)}>Deletar</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;