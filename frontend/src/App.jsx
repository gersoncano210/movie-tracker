import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [miLista, setMiLista] = useState([]);

  const buscarPeliculas = async () => {
    const response = await fetch(
      `http://localhost:3001/api/movies/search?query=${query}`
    );
    const data = await response.json();
    setResults(data.results);
  };

  const cargarMiLista = async () => {
    const response = await fetch('http://localhost:3001/api/mylist/1');
    const data = await response.json();
    setMiLista(data);
  };

  useEffect(() => {
    cargarMiLista();
  }, []);

const guardarPelicula = async (pelicula) => {
  const response = await fetch('http://localhost:3001/api/mylist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tmdbId: pelicula.id,
      mediaType: 'movie',
      title: pelicula.title,
      posterPath: pelicula.poster_path,
      userId: 1
    })
  });

  if (response.status === 409) {
    alert('Esta película ya está en tu lista');
    return;
  }

  alert(`${pelicula.title} guardada en tu lista`);
  cargarMiLista();
};

  const marcarComoVista = async (id) => {
  const rating = prompt('¿Qué calificación le das? (1-10)');
  if (!rating) return;

  await fetch(`http://localhost:3001/api/mylist/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'vista',
      myRating: Number(rating)
    })
  });
  cargarMiLista();
};

const eliminarDeLista = async (id) => {
  const confirmar = confirm('¿Seguro que quieres eliminar esta película de tu lista?');
  if (!confirmar) return;

  await fetch(`http://localhost:3001/api/mylist/${id}`, {
    method: 'DELETE'
  });
  cargarMiLista();
};

  return (
    <div className="App">
      <h1>🎬 Movie Tracker</h1>

      <div className="buscador">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar una película..."
        />
        <button onClick={buscarPeliculas}>Buscar</button>
      </div>

      <div className="resultados">
        {results.map((pelicula) => (
          <div key={pelicula.id} className="tarjeta">
            <img
              src={`https://image.tmdb.org/t/p/w200${pelicula.poster_path}`}
              alt={pelicula.title}
            />
            <p>{pelicula.title}</p>
            <button onClick={() => guardarPelicula(pelicula)}>
              Guardar en mi lista
            </button>
          </div>
        ))}
      </div>

<h2>Mi lista</h2>
<div className="resultados">
  {miLista.map((entrada) => (
    <div key={entrada.id} className="tarjeta">
      <img
        src={`https://image.tmdb.org/t/p/w200${entrada.posterPath}`}
        alt={entrada.title}
      />
      <p>{entrada.title}</p>
      <p><small>{entrada.status}{entrada.myRating ? ` · ${entrada.myRating}/10` : ''}</small></p>
      <button onClick={() => marcarComoVista(entrada.id)}>Marcar vista</button>
      <button onClick={() => eliminarDeLista(entrada.id)} className="btn-borrar">
        Eliminar
      </button>
    </div>
  ))}
</div>
    </div>
  );
}

export default App;