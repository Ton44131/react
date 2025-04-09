import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get('https://dragonball-api.com/api/characters?limit=20&page=1')
      .then((res) => {
        console.log(res.data.items); // Verifica se os dados vieram corretamente
        setCharacters(res.data.items);
      })
      .catch((err) => console.error('Erro ao carregar personagens:', err));
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Dragon Ball Z - Personagens</h1>
      </header>

      <div className="content">
        <div className="character-list">
          <h2>Lista</h2>
          {characters.length === 0 ? (
            <p>Carregando personagens...</p>
          ) : (
            <ul>
              {characters.map((char) => (
                <li key={char.id} onClick={() => setSelected(char)}>
                  <img src={char.image} alt={char.name} />
                  <span>{char.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selected && (
          <div className="character-details">
            <h2>{selected.name}</h2>
            <img src={selected.image} alt={selected.name} />
            <p><strong>Ki:</strong> {selected.ki || 'Desconhecido'}</p>
            <p><strong>Raça:</strong> {selected.race}</p>
            <p><strong>Planeta de origem:</strong> {selected.originPlanet}</p>
            <p><strong>Afiliação:</strong> {selected.affiliation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
