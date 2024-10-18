import { apiClient } from './apiClient';

export const updateUser = async (userDetails) => {
    try {
        const response = await apiClient.put('/users/update', userDetails);
        return response;
    } catch (error) {
        console.error('Error updating profile: ', error.response);
        throw error;
    }
}

export const getUser = async () => {
    try {
        const response = await apiClient.put('/users/current-user');
        return response;
    }
    catch(error) {
        console.error('Error fetching profile: ', error.response);
        throw error;
    }
}

export const getOrgDetails = async () => {
    try {
        const response = await apiClient.get('/team/details');
        return response;
    } catch (error) {
        console.error('Error getting details: ', error.message);
        throw error;
    }
}

export const editOrgName = async (name) => {
    try {
        const response = await apiClient.put('/team/update', name);
        return response;
    } catch (error) {
        console.error('Error updating organisation: ', error.response);
        throw error;
    }
}