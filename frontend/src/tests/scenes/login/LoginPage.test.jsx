import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '../../../scenes/login/LoginPage';
import * as loginServices from '../../../services/loginServices';
import { AuthProvider } from '../../../services/authProvider'; // Import your AuthProvider

vi.mock('../../../services/loginServices');

describe('LoginPage', () => {
  it('renders the login page', () => {
    render(
      <Router>
        <AuthProvider> 
          <LoginPage />
        </AuthProvider>
      </Router>
    );

    expect(screen.getByText('Log in to your account')).not.toBeNull();
    expect(screen.getByPlaceholderText('Enter email')).not.toBeNull();
    expect(screen.getByPlaceholderText('Enter password')).not.toBeNull();
    expect(screen.getByText("Don't have an account?")).not.toBeNull();
  });

  it('handles login success', async () => {
    loginServices.login.mockResolvedValueOnce({ data: { success: true } });

    render(
      <Router>
        <AuthProvider> 
          <LoginPage />
        </AuthProvider>
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Sign In'));

    expect(loginServices.login).toHaveBeenCalledWith('test@example.com', 'password');
    // Add more assertions as needed
  });

  it('handles login failure', async () => {
    loginServices.login.mockRejectedValueOnce({ response: { data: { error: 'Invalid credentials' } } });

    render(
      <Router>
        <AuthProvider> 
          <LoginPage />
        </AuthProvider>
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Sign In'));

    expect(await screen.findByText('Invalid credentials')).not.toBeNull();
  });
});
