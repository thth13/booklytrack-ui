'use client';
import { useState, useContext, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/src/context/AuthContext';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function LoginPage() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { login } = auth;
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const { email, password } = formData;
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
      }}
    >
      <div
        style={{
          width: '350px',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Log in</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading ? 'Registering...' : 'Log in'}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>
            Forgot password?
          </a>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          Dont have an account?{' '}
          <Link href="register" style={{ color: '#007bff', textDecoration: 'none' }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
