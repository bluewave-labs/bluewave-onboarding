import {apiClient} from './apiClient'; 

export const addBanner = async (bannerData) => {
  try {
    const response = await apiClient.post('/banner/add_banner', bannerData);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Add Banner error:', error);
    throw error;
  }
};
