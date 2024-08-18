import {apiClient} from './apiClient'; 

export const addPopup = async (popupData) => {
  try {
    const response = await apiClient.post('/popup/add_popup', popupData);
    return response.data;
  } catch (error) {
    console.error('Add Popup error:', error.response);
    throw error;
  }
};
