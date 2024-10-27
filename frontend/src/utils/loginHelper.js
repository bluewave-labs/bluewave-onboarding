import { AUTH_TYPE } from './constants';
import toastEmitter, { TOAST_EMITTER_KEY } from './toastEmitter';

export const handleAuthSuccess = (authType, response, loginAuth, navigate) => {
    const { name, surname, email, picture } = response.data.user;
    const payload = { name, surname, email, picture };
    // Emit toast notification
    toastEmitter.emit(TOAST_EMITTER_KEY, 'Login successful');

    // Update authentication state
    loginAuth(payload);

    if (authType === AUTH_TYPE.LOGIN) {
        navigate('/')
    }
    if (authType === AUTH_TYPE.SIGNUP) {
        navigate('/progress-steps');
    }
};
