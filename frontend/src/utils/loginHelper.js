import { AUTH_TYPE } from './constants';
import { getTeamCount } from '../services/teamServices';
import toastEmitter, { TOAST_EMITTER_KEY } from './toastEmitter';

export const handleAuthSuccess = (response, loginAuth, navigate) => {
    const { name, surname, email, picture } = response.user;
    const payload = { name, surname, email, picture };
    // Emit toast notification
    toastEmitter.emit(TOAST_EMITTER_KEY, 'Login successful');

    // Update authentication state
    loginAuth(payload);

    getTeamCount()
        .then(response => {
            const { teamCount } = response;
            if (teamCount === 0) {
                navigate('/progress-steps');
            } else {
                navigate('/');
            }
        })
        .catch(err => console.error(err));
};
