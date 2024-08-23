import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import CreatePopupPage from '../../../scenes/popup/CreatePopupPage';
import * as popupServices from '../../../services/popupServices';
import * as loginServices from '../../../services/loginServices';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react'; 

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(), // Mock useNavigate to avoid actual routing
  };
});

vi.mock('../../../services/popupServices');
vi.mock('../../../services/loginServices');

describe('CreatePopupPage component', () => {
  it('handles onSave and successful popup creation', async () => {
    // Mock the sign-up process to simulate a successful registration
    vi.spyOn(loginServices, 'signUp').mockResolvedValueOnce({
      token: 'mockAuthToken',
    });
    
    // Simulate user registration and set token in localStorage
    await act(async () => {
      await loginServices.signUp({ username: 'test_user', email: 'test_user@example.com', password: 'password123' });
      localStorage.setItem('authToken', 'mockAuthToken');
    });

    const mockAddPopup = vi.spyOn(popupServices, 'addPopup').mockResolvedValueOnce({
      data: { success: true },
    });

    await act(async () => {
      render(
        <Router>
          <CreatePopupPage />
        </Router>
      );
    });

    // Log the current state of the DOM for debugging
    screen.debug();

    // Wait for the "Save" button to appear in the DOM
    const saveButton = await waitFor(() => screen.getByRole('button', { name: /Save/i }), { timeout: 3000 });

    // Trigger the Save button click
    fireEvent.click(saveButton);

    // Ensure the addPopup service was called
    expect(mockAddPopup).toHaveBeenCalledTimes(1);
  });

  it('handles onSave and failed popup creation', async () => {
    // Mock the sign-up process
    vi.spyOn(loginServices, 'signUp').mockResolvedValueOnce({
      token: 'mockAuthToken',
    });
    
    // Simulate user registration and set token in localStorage
    await act(async () => {
      await loginServices.signUp({ username: 'test_user', email: 'test_user@example.com', password: 'password123' });
      localStorage.setItem('authToken', 'mockAuthToken');
    });

    const mockAddPopup = vi.spyOn(popupServices, 'addPopup').mockRejectedValueOnce({
      response: { data: { errors: [{ msg: 'An error occurred' }] } },
    });

    await act(async () => {
      render(
        <Router>
          <CreatePopupPage />
        </Router>
      );
    });

    // Log the current state of the DOM for debugging
    screen.debug();

    // Wait for the "Save" button to appear in the DOM
    const saveButton = await waitFor(() => screen.getByRole('button', { name: /Save/i }), { timeout: 3000 });

    // Trigger the Save button click
    fireEvent.click(saveButton);

    // Ensure the addPopup service was called and handled the error
    expect(mockAddPopup).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('An error occurred')).toBeInTheDocument();
  });
});
