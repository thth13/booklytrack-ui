'use client';
import { useState, useContext, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/src/context/AuthContext';
import { useTheme } from '@/src/context/ThemeContext';
import themeStyles from '@/src/lib/themeStyles';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  server?: string;
}

export default function RegistrationForm() {
  const auth = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  const { register } = auth;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const currentTheme = themeStyles[theme];

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (formData.name.length < 1) {
      newErrors.name = 'Логин должен содержать минимум 3 символааа';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Пожалуйста, введите корректный email';
    }

    if (formData.password.length < 5) {
      newErrors.password = 'Пароль должен содержать минимум 5 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name as keyof ValidationErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    const { name, email, password } = formData;
    setLoading(true);

    try {
      await register(name, email, password);
    } catch (error: any) {
      const serverErrors = error.response.data;

      setErrors(serverErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: currentTheme.background,
        color: currentTheme.textColor,
      }}
    >
      <button
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '8px 16px',
          backgroundColor: theme === 'light' ? '#2d2d2d' : '#f4f4f4',
          color: theme === 'light' ? '#fff' : '#000',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <div
        style={{
          width: '350px',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: currentTheme.cardBackground,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: errors.name ? '1px solid red' : `1px solid ${currentTheme.inputBorder}`,
                borderRadius: '5px',
                backgroundColor: currentTheme.inputBackground,
                color: currentTheme.textColor,
              }}
            />
            {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
          </div>
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
              style={{
                width: '100%',
                padding: '8px',
                border: errors.email ? '1px solid red' : `1px solid ${currentTheme.inputBorder}`,
                borderRadius: '5px',
                backgroundColor: currentTheme.inputBackground,
                color: currentTheme.textColor,
              }}
            />
            {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
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
              style={{
                width: '100%',
                padding: '8px',
                border: errors.password ? '1px solid red' : `1px solid ${currentTheme.inputBorder}`,
                borderRadius: '5px',
                backgroundColor: currentTheme.inputBackground,
                color: currentTheme.textColor,
              }}
            />
            {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: errors.confirmPassword ? '1px solid red' : `1px solid ${currentTheme.inputBorder}`,
                borderRadius: '5px',
                backgroundColor: currentTheme.inputBackground,
                color: currentTheme.textColor,
              }}
            />
            {errors.confirmPassword && <span style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword}</span>}
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
            {loading ? 'Registration...' : 'Sign up'}
          </button>
          {errors.server && (
            <div
              style={{
                marginTop: '10px',
                color: 'red',
                fontSize: '12px',
                textAlign: 'center',
              }}
            >
              {errors.server}
            </div>
          )}
        </form>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          Already have an account?{' '}
          <Link href="login" style={{ color: '#007bff', textDecoration: 'none' }}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
