import toastEmitter, { TOAST_EMITTER_KEY } from './toastEmitter';

export const emitToastError = (error) => {
    if (error.response?.data) {
        toastEmitter.emit(TOAST_EMITTER_KEY, 'An error occurred: ' + error.response.data.errors[0].msg)
    } else {
        toastEmitter.emit(TOAST_EMITTER_KEY, 'An error occurred. Please check your network connection and try again.')
    }
}