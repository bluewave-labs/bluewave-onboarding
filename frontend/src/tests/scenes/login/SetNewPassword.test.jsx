import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../../services/authProvider'; // Import your AuthProvider
import SetNewPassword from '../../../scenes/login/SetNewPassword';
import { resetPassword } from '../../../services/loginServices';

vi.mock('../../../services/loginServices', () => ({
    resetPassword: vi.fn(),
}));

describe('SetNewPasswordPage', () => {
    it('renders the set new password reset page', () => {
        render(
            <Router>
                <AuthProvider>
                    <SetNewPassword />
                </AuthProvider>
            </Router>
        );

        expect(screen.getByText('Set new Password')).not.toBeNull();
        expect(screen.getByText('Your new password must be different to previously used passwords.')).not.toBeNull();
    });

    it('handles reset password success', async () => {
        resetPassword.mockResolvedValueOnce({ data: { success: true } });

        render(
            <Router>
                <AuthProvider>
                    <SetNewPassword />
                </AuthProvider>
            </Router>
        );

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Create your password'), { target: { value: 'test123' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm your password'), { target: { value: 'test123' } });
            fireEvent.click(screen.getByText('Reset Password'));
        })

        expect(resetPassword).toHaveBeenCalledWith({ email: 'asdf@asdf.com', password: 'test123' });

    });

    it('handles reset password internal server error', async () => {
        resetPassword.mockRejectedValueOnce({ response: { data: { error: 'Internal Server Error' } } });

        render(
            <Router>
                <AuthProvider>
                    <SetNewPassword />
                </AuthProvider>
            </Router>
        );
        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Create your password'), { target: { value: 'test123' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm your password'), { target: { value: 'test123' } });
            fireEvent.click(screen.getByText('Reset Password'));
        })

        await waitFor(() => {
            expect(screen.getByText('Internal Server Error')).to.exist;
        });

        expect(resetPassword).toHaveBeenCalledWith({ email: 'asdf@asdf.com', password: 'test123' });
    });
});
