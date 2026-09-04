import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || 'Error al registrarse');
      return;
    }

    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h1>🎬 Movie Tracker</h1>
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Crear cuenta</h2>
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
        <button type="submit">Registrarme</button>
        <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </form>
    </div>
  );
}

export default Register;