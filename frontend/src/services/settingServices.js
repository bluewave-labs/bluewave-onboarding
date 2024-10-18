import { apiClient } from './apiClient';

export const updateUser = async (userDetails) => {
    console.log("🚀 ~ updateUser ~ userDetails:", userDetails)
    try {
        const response = await apiClient.put('/users/update', userDetails);
        return response;
    } catch (error) {
        console.error('Error updating profile: ', error.response);
        throw error;
    }
}