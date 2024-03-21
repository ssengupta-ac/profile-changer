import LoginForm from '../components/LoginForm';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <p>
        Do not have an account? <Link href="/signup">Sign up here</Link>
      </p>
    </div>
  );
}
