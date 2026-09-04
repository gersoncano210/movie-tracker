import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import '../App.css';

function Profile() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const scrollRef = useRef(null);

  const [miLista, setMiLista] = useState([]);

  const cargarMiLista = async () => {
    const response = await fetch(`http://localhost:3001/api/mylist/${usuario.id}`);
    const data = await response.json();
    setMiLista(data);
  };

  useEffect(() => {
    cargarMiLista();
  }, []);

  useEffect(() => {
  document.title = 'Cinea - Mi Perfil';
}, []);

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

  const mover = (direccion) => {
    scrollRef.current.scrollBy({
      left: direccion * 600,
      behavior: 'smooth'
    });
  };

  return (
    <div className="App">
      <Header mostrarLinkPerfil={false} />
      <p>Hola, {usuario.nombre}</p>

      <h2>Mi lista</h2>
      <div className="grilla-lista">
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

      <Footer />
    </div>
  );
}

export default Profile;