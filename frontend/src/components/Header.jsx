import { Link } from 'react-router-dom';

function Header({ mostrarLinkPerfil, mostrarCerrarSesion = true }) {
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  };

  return (
    <header className="home-header">
      <Link to="/" className="marca">
        <img src="/logo blanco.png" alt="Cinea" className="logo" />
        <div>
          <h1>Cinea</h1>
          <p className="slogan">Crea tu propio catálogo</p>
        </div>
      </Link>

      <div className="acciones-header">
        {mostrarLinkPerfil && (
          <Link to="/profile" className="link-perfil">Mi perfil</Link>
        )}
        {mostrarCerrarSesion && (
          <button onClick={cerrarSesion} className="btn-secundario">
            Cerrar sesión
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;