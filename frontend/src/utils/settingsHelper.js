import toastEmitter, { TOAST_EMITTER_KEY } from './toastEmitter';

export const handleGetUserSettings = (message) => {
}

export const handleNothingToUpdateProfile = (message) => {
    toastEmitter.emit(TOAST_EMITTER_KEY, message);
}

export const handleProfileUpdateSuccess = (response, updateProfile) => {

    const userData = response.data.user;

    // Emit toast notification
    if (response.status == 200) {
        updateProfile(userData);
        toastEmitter.emit(TOAST_EMITTER_KEY, 'Profile updated successfully !');
    } else {
        toastEmitter.emit(TOAST_EMITTER_KEY, 'Error updating profile !');
    }
};

export const handleOrgDataError = (message) => {
    toastEmitter.emit(TOAST_EMITTER_KEY, message);
}

export const handleEditOrgNameSuccess = (message) => {
    // if (response.status == 200) {
    //     setOrgName(userData);
        toastEmitter.emit(TOAST_EMITTER_KEY, message);
    // } else {
    //     toastEmitter.emit(TOAST_EMITTER_KEY, 'Error updating profile !');
    // }
};

export const handleRemoveTeamMemberError = (message) => {
    toastEmitter.emit(TOAST_EMITTER_KEY, message);
}

export const handleRemoveTeamMemberSuccess = (response, setOrgName) => {
    // if (response.status == 200) {
    //     setOrgName(userData);
        toastEmitter.emit(TOAST_EMITTER_KEY, 'Profile updated successfully !');
    // } else {
    //     toastEmitter.emit(TOAST_EMITTER_KEY, 'Error updating profile !');
    // }
};