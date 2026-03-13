import { useNavigate } from 'react-router-dom';
import type { User } from '@node-react-fullstack/shared';

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    backgroundColor: '#f6f8fa',
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '3rem 4rem',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    textAlign: 'center',
    maxWidth: '420px',
    width: '100%',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginBottom: '1rem',
  },
  greeting: { fontSize: '1.6rem', marginBottom: '0.3rem' },
  username: { color: '#57606a', marginBottom: '2rem', fontSize: '1rem' },
  badge: {
    display: 'inline-block',
    background: '#dafbe1',
    color: '#1a7f37',
    borderRadius: '999px',
    padding: '0.25rem 0.85rem',
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '2rem',
  },
  button: {
    padding: '0.65rem 1.4rem',
    backgroundColor: '#fff',
    color: '#cf222e',
    border: '1px solid #cf222e',
    borderRadius: '8px',
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
};

export default function DashboardPage({ user, onLogout }: DashboardPageProps) {
  const navigate = useNavigate();

  async function handleLogout() {
    await fetch('/auth/logout', { method: 'DELETE', credentials: 'include' });
    onLogout();
    navigate('/', { replace: true });
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {user.avatarUrl && (
          <img src={user.avatarUrl} alt={user.login} style={styles.avatar} />
        )}
        <h1 style={styles.greeting}>
          Hey, {user.displayName || user.login}!
        </h1>
        <p style={styles.username}>@{user.login}</p>
        <div style={styles.badge}>✓ Authenticated with GitHub</div>
        <br />
        <button style={styles.button} onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </div>
  );
}
