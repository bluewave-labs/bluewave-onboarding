import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateAccountPage from '../../../scenes/login/CreateAccountPage';
import { signUp } from '../../../services/loginServices';
import { AuthProvider } from '../../../services/authProvider';

vi.mock('../../../services/loginServices', () => ({
  signUp: vi.fn(),
}));

describe('CreateAccountPage', () => {
  it('renders the create account page', () => {
    render(
      <Router>
        <AuthProvider> 
          <CreateAccountPage />
        </AuthProvider>
      </Router>
    );

    expect(screen.getByText('Create an account')).to.exist;
    expect(screen.getByPlaceholderText('Enter your name')).to.exist;
    expect(screen.getByPlaceholderText('Enter your surname')).to.exist;
    expect(screen.getByPlaceholderText('Enter your email')).to.exist;
    expect(screen.getByPlaceholderText('Create your password')).to.exist;
    expect(screen.getByText('Get started')).to.exist;
  });

  it('validates name input', () => {
    render(
      <Router>
        <AuthProvider>
          <CreateAccountPage />
        </AuthProvider>
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(usernameInput, { target: { value: 'testname' } });

    expect(usernameInput.value).to.equal('testname');
  });

  it('validates surname input', () => {
    render(
      <Router>
        <AuthProvider>
          <CreateAccountPage />
        </AuthProvider>
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('Enter your surname');
    fireEvent.change(usernameInput, { target: { value: 'testsurname' } });

    expect(usernameInput.value).to.equal('testsurname');
  });

  it('validates email input', () => {
    render(
      <Router>
        <AuthProvider>
          <CreateAccountPage />
        </AuthProvider>
      </Router>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).to.equal('test@example.com');
  });

  it('validates password input', () => {
    render(
      <Router>
        <AuthProvider>
          <CreateAccountPage />
        </AuthProvider>
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText('Create your password');
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });

    expect(passwordInput.value).to.equal('Password1!');
  });

  it('handles sign up success', async () => {
    signUp.mockResolvedValueOnce({ data: { success: true } });

    render(
      <Router>
        <AuthProvider>
          <CreateAccountPage />
        </AuthProvider>
      </Router>
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'testname' } });
      fireEvent.change(screen.getByPlaceholderText('Enter your surname'), { target: { value: 'testsurname' } });
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Create your password'), { target: { value: 'Password1!' } });
      fireEvent.click(screen.getByText('Get started'));
    });

    expect(signUp).toHaveBeenCalledWith({ name: 'testname', surname: 'testsurname', email: 'test@example.com', password: 'Password1!' });
    // Add more assertions as needed
  });

  it('handles sign up failure with email already exists error', async () => {
    signUp.mockRejectedValueOnce({
      response: {
        data: { error: 'Email already exists' },
        status: 400,
      },
    });

    render(
      <Router>
        <AuthProvider>
          <CreateAccountPage />
        </AuthProvider>
      </Router>
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'testname' } });
      fireEvent.change(screen.getByPlaceholderText('Enter your surname'), { target: { value: 'testsurname' } });
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Create your password'), { target: { value: 'Password1!' } });
      fireEvent.click(screen.getByText('Get started'));
    });

    await waitFor(() => {
      expect(screen.getByText('Email already exists')).to.exist;
    });

    expect(signUp).toHaveBeenCalledWith({ name: 'testname', surname: 'testsurname', email: 'test@example.com', password: 'Password1!' });
  });

  it('handles sign up failure with other errors', async () => {
    signUp.mockRejectedValueOnce({
      response: {
        data: { error: 'Some other error' },
        status: 500,
      },
    });

    render(
      <Router>
        <AuthProvider>
          <CreateAccountPage />
        </AuthProvider>
      </Router>
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'testname' } });
      fireEvent.change(screen.getByPlaceholderText('Enter your surname'), { target: { value: 'testsurname' } });
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Create your password'), { target: { value: 'Password1!' } });
      fireEvent.click(screen.getByText('Get started'));
    });

    await waitFor(() => {
      expect(screen.getByText('An error occurred. Please try again.')).to.exist;
    });

    expect(signUp).toHaveBeenCalledWith({ name: 'testname', surname: 'testsurname', email: 'test@example.com', password: 'Password1!' });
  });

  it('handles network errors gracefully', async () => {
    signUp.mockRejectedValueOnce(new Error('Network Error'));

    render(
      <Router>
        <AuthProvider>
          <CreateAccountPage />
        </AuthProvider>
      </Router>
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'testname' } });
      fireEvent.change(screen.getByPlaceholderText('Enter your surname'), { target: { value: 'testsurname' } });
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByPlaceholderText('Create your password'), { target: { value: 'Password1!' } });
      fireEvent.click(screen.getByText('Get started'));
    });

    await waitFor(() => {
      expect(screen.getByText('An error occurred. Please check your network connection and try again.')).to.exist;
    });

    expect(signUp).toHaveBeenCalledWith({ name: 'testname', surname: 'testsurname', email: 'test@example.com', password: 'Password1!' });
  });
});
