import toastEmitter, { TOAST_EMITTER_KEY } from './toastEmitter';

export const handleAuthSuccess = (response, loginAuth, navigate) => {
    const userData = response.user;
    const fullName = userData.surname ? `${userData.name} ${userData.surname}` : userData.name;
    const payload = { fullName, role: userData.role };

    // Emit toast notification
    toastEmitter.emit(TOAST_EMITTER_KEY, 'Login successful');

    // Update authentication state
    loginAuth(payload);

    // Navigate to the home page
    navigate('/');
};
