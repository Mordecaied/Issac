import React, { useState } from 'react';


const LoginForm: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
     
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={emailOrUsername}
        onChange={(e) => setEmailOrUsername(e.target.value)}
        placeholder="Email or Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;