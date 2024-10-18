import toastEmitter, { TOAST_EMITTER_KEY } from './toastEmitter';

export const handleNothingToUpdateProfile = (message) => {
    toastEmitter.emit(TOAST_EMITTER_KEY, message);
}

export const handleProfileUpdateSuccess = (response, updateProfile) => {

    const userData = response.data.user;
    // const updated = response.updated;

    // Emit toast notification
    if (response.status == 200) {
        updateProfile(userData);
        toastEmitter.emit(TOAST_EMITTER_KEY, 'Profile updated successfully !');
    } else {
        toastEmitter.emit(TOAST_EMITTER_KEY, 'Error updating profile !');
    }
};
