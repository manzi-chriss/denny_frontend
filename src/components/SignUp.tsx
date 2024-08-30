import { useState } from 'react';
import './login.css'; 
import Axios from 'axios'

function SignUpPage() {
  const [error,setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = e.target;
    try {
      const response = await Axios.post('http://localhost:3000/api/users', {
        username: username.value,
        email: email.value,
        password: password.value,
      });
      alert('User registered successfully');
      username.value = '';
      email.value = '';
      password.value = '';
    } catch (error) {
      console.error(error.message);
      // alert(error.message);
      setError(error.message)
    }
  }
  return (
    <div className="container">
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text"name='username' placeholder="Username" required />
          <input type="email" name='email' placeholder="Email" required />
          <input type="password" name='password' placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          {error&&<p className='text-red-500'>{error}</p>}
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
