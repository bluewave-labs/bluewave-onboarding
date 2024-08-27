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

export const getBannerById = async (bannerId) => {
  try {
    const response = await apiClient.get(`/banner/get_banner/${bannerId}`);
    return response.data;
  } catch (error) {
    console.error(`Get Banner by ID (${bannerId}) error:`, error);
    throw error;
  }
};

export const editBanner = async (bannerId, bannerData) => {
  try {
    const response = await apiClient.put(`/banner/edit_banner/${bannerId}`, bannerData);
    return response.data;
  } catch (error) {
    console.error(`Edit Banner error for ID (${bannerId}):`, error);
    throw error;
  }
};

export const deleteBanner = async (bannerId) => {
  try {
    const response = await apiClient.delete(`/banner/delete_banner/${bannerId}`);
    return response.data;
  } catch (error) {
    console.error(`Delete Banner error for ID (${bannerId}):`, error);
    throw error;
  }
};
