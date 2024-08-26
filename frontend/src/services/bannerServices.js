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

export const getBanners = async () => {
  try {
    const response = await apiClient.get('/banner/banners');
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Get Banners error:', error);
    throw error;
  }
};
