'use client';
import { useContext } from 'react';
import { AuthContext } from '@/src/context/AuthContext';

export default function LogoutButton() {
  const auth = useContext(AuthContext);

  if (!auth) return null;

  return (
    <button
      className="logout-btn"
      style={{
        marginLeft: '16px',
        background: 'linear-gradient(90deg, #fc4545 0%, #ff6363 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 24px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(255,88,88,0.15)',
      }}
      onClick={auth.logout}
    >
      Выйти
    </button>
  );
}
