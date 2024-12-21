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

export const addServerUrl = async url => {
  try {
    const response = await apiClient.put(`${baseEndpoint}/server-url`, { serverUrl: url });
    return response.data;
  } catch (err) {
    console.error('Error setting server url: ', err);
    throw err;
  }
}

export const getServerUrl = async () => {
  try {
    const response = await apiClient.get(`${baseEndpoint}/server-url`);
    return response.data;
  } catch (err) {
    console.error('Error getting server url: ', err);
    throw err;
  }
};