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

export const getPopups= async () => {
  try {
    const response = await apiClient.get('/popup/popups');
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Get Popups error:', error);
    throw error;
  }
};
