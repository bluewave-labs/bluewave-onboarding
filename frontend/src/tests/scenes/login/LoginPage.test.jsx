import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '../../../scenes/login/LoginPage';
import * as loginServices from '../../../services/loginServices';

vi.mock('../../../services/loginServices');

describe('LoginPage', () => {
  it('renders the login page', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    expect(screen.getByText('Log in to your account')).not.toBeNull();
    expect(screen.getByLabelText('Email:')).not.toBeNull();
    expect(screen.getByLabelText('Password:')).not.toBeNull();
    expect(screen.getByText("Don't have an account?")).not.toBeNull();
  });

  it('handles login success', async () => {
    loginServices.login.mockResolvedValueOnce({ data: { success: true } });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Sign in'));

    expect(loginServices.login).toHaveBeenCalledWith('test@example.com', 'password');
    // Add more assertions as needed
  });

  it('handles login failure', async () => {
    loginServices.login.mockRejectedValueOnce({ response: { data: { error: 'Invalid credentials' } } });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Sign in'));

    expect(await screen.findByText('Invalid credentials')).not.toBeNull();
  });
});
