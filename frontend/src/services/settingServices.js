import { apiClient } from './apiClient';

export const updateUser = async (userDetails) => {
    try {
        const response = await apiClient.put('/users/update-profile', userDetails);
        return response.data;
    } catch (error) {
        console.error('Error updating profile: ', error.response);
        throw error;
    }
}