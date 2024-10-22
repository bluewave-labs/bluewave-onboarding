import toastEmitter, { TOAST_EMITTER_KEY } from './toastEmitter';

export const handleAuthSuccess = (response, loginAuth, navigate) => {
    const { name, surname, email } = response.user;
    const payload = { name, surname, email };
    // Emit toast notification
    toastEmitter.emit(TOAST_EMITTER_KEY, 'Login successful');

    // Update authentication state
    loginAuth(payload);

    // Navigate to the home page
    navigate('/');
};
