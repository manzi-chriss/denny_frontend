import { useState } from 'react';
import './login.css'; 
import Axios, { AxiosError } from 'axios';

function SignUpPage() {
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password } = e.currentTarget;

    try {
      await Axios.post('https://denny-backend.onrender.com/api/users', {
        username: username.value,
        email: email.value,
        password: password.value,
      });
      alert('User registered successfully');
      username.value = '';
      email.value = '';
      password.value = '';
    } catch (err) {
      console.error(err);
      // Handle the error using type assertion
      if (err instanceof AxiosError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
