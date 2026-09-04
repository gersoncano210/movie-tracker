import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      setError('Correo o contraseña incorrectos');
      return;
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h1>🎬 Movie Tracker</h1>
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Iniciar sesión</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </form>
    </div>
  );
}

export default Login;