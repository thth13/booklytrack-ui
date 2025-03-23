import Link from 'next/link';
// import styles from "./page.module.css";

export default function Home() {
  return (
    <div
      style={{
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Читательский дневник</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '30px' }}>
        Ведите читательские дневники, добавляйте список прочитанных книг, пишите конспекты, цитаты, рецензии и
        подписывайтесь на других пользователей, чтобы видеть, что они читают и пишут.
      </p>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link
          href="/auth/register"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
            fontSize: '1rem',
          }}
        >
          Регистрация
        </Link>
        <Link
          href="/auth/login"
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
            fontSize: '1rem',
          }}
        >
          Вход
        </Link>
      </div>
    </div>
  );
}
