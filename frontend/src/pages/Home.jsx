import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import Toast from '../components/Toast';
import '../App.css';

const GENEROS = [
  { id: 28, nombre: 'Acción' },
  { id: 35, nombre: 'Comedia' },
  { id: 18, nombre: 'Drama' },
  { id: 27, nombre: 'Terror' },
  { id: 10749, nombre: 'Romance' },
  { id: 16, nombre: 'Animación' }
];

function guardarPelicula(pelicula, usuario, mostrarToast) {
  return async () => {
    const response = await fetch('http://localhost:3001/api/mylist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tmdbId: pelicula.id,
        mediaType: 'movie',
        title: pelicula.title,
        posterPath: pelicula.poster_path,
        userId: usuario.id
      })
    });

    if (response.status === 409) {
      mostrarToast('Esta película ya está en tu lista');
      return;
    }

    mostrarToast(`${pelicula.title} guardada en tu lista`);
  };
}

function CarruselGenero({ genero, peliculas, usuario, mostrarToast }) {
  const scrollRef = useRef(null);

  const mover = (direccion) => {
    scrollRef.current.scrollBy({
      left: direccion * 600,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <h2>{genero.nombre}</h2>
      <div className="carrusel-wrapper">
        <button className="flecha flecha-izq" onClick={() => mover(-1)}>
          ‹
        </button>

        <div className="carrusel" ref={scrollRef}>
          {peliculas.map((pelicula) => (
            <div key={pelicula.id} className="tarjeta-carrusel">
              <img
                src={`https://image.tmdb.org/t/p/w200${pelicula.poster_path}`}
                alt={pelicula.title}
              />
              <p>{pelicula.title}</p>
              <button onClick={guardarPelicula(pelicula, usuario, mostrarToast)}>
                +
              </button>
            </div>
          ))}
        </div>

        <button className="flecha flecha-der" onClick={() => mover(1)}>
          ›
        </button>
      </div>
    </div>
  );
}

function Home() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const [peliculasPorGenero, setPeliculasPorGenero] = useState({});
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [toast, setToast] = useState(null);

  const cargarGenero = async (genero) => {
    const response = await fetch(
      `http://localhost:3001/api/movies/genres/${genero.id}`
    );
    const data = await response.json();

    setPeliculasPorGenero((anterior) => ({
      ...anterior,
      [genero.id]: data.results
    }));
  };

  useEffect(() => {
  GENEROS.forEach((genero) => cargarGenero(genero));
}, []);

useEffect(() => {
  if (!toast) return;
  const timer = setTimeout(() => setToast(null), 3000);
  return () => clearTimeout(timer);
}, [toast]);

useEffect(() => {
  document.title = 'Cinea - Inicio';
}, []);


  const buscarPeliculas = async () => {
    const response = await fetch(
      `http://localhost:3001/api/movies/search?query=${query}`
    );
    const data = await response.json();
    setResults(data.results);
  };

  return (
    <div className="App">
      <Header mostrarLinkPerfil={true} />

      <div className="buscador">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar una película..."
        />
        <button onClick={buscarPeliculas}>Buscar</button>
      </div>

      {results.length > 0 && (
        <>
          <h2>Resultados de búsqueda</h2>
          <div className="resultados">
            {results.map((pelicula) => (
              <div key={pelicula.id} className="tarjeta">
                <img
                  src={`https://image.tmdb.org/t/p/w200${pelicula.poster_path}`}
                  alt={pelicula.title}
                />
                <p>{pelicula.title}</p>
                <button onClick={guardarPelicula(pelicula, usuario, setToast)}>
                  Guardar en mi lista
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {GENEROS.map((genero) => (
        <CarruselGenero
          key={genero.id}
          genero={genero}
          peliculas={peliculasPorGenero[genero.id] || []}
          usuario={usuario}
          mostrarToast={setToast}
        />
      ))}
      <Toast mensaje={toast} />
      <Footer />
    </div>
  );
}

export default Home;