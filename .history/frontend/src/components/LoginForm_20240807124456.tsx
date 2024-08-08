import React, { useState } from 'react';

interface LoginFormProps {
  onLoginSuccess: (emailOrUsername: string, password: string) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onLoginSuccess(emailOrUsername, password);
    } catch (err) {
      setError('Failed to log in');
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