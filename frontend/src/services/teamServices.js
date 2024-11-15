import { apiClient } from './apiClient';

const baseEndpoint = "team/";

export const setOrganisation = async (name) => {
  try {
    const response = await apiClient.post(`${baseEndpoint}/set-organisation`, {
      name
    })
    return response.data;
  } catch (err) {
    console.error('Error setting organization: ', err.response);
    throw err;
  }
};

export const getTeamCount = async () => {
  try {
    const response = await apiClient.get(`${baseEndpoint}/count`);
    return response.data;
  } catch (err) {
    console.error('Error getting team count: ', err);
    throw err;
  }
}

export const setConfig = async (serverUrl, apiKey) => {
  try {
    const response = await apiClient.put(`${baseEndpoint}/set-config`, { serverUrl, apiKey });
    return response.data;
  } catch (err) {
    console.error('Error setting Server URL and API Key: ', err);
    throw err;
  }
}