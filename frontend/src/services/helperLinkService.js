import { apiClient } from "./apiClient";

export const getHelpers = async () => {
  try {
    const response = await apiClient.get(`/helper-link`);
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Update helper link error:", error.response);
    throw error;
  }
};
export const getHelperById = async (id) => {
  try {
    const response = await apiClient.get(`/helper-link/${id}`);
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Update helper link error:", error.response);
    throw error;
  }
};

export const createHelper = async (helper) => {
  try {
    const response = await apiClient.post(`/helper-link`, {
      title: helper.title,
    });
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Update helper link error:", error.response);
    throw error;
  }
};

export const updateHelper = async (helper) => {
  try {
    const response = await apiClient.put(`/helper-link/${helper.id}`, {
      title: helper.title,
      headerBackgroundColor: helper.headerBackgroundColor,
      linkFontColor: helper.linkFontColor,
      iconColor: helper.iconColor,
      userId: helper.userId,
    });
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Update helper link error:", error.response);
    throw error;
  }
};

export const deleteHelper = async (id) => {
  try {
    const response = await apiClient.delete(`/helper-link/${id}`);
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Delete helper link error:", error.response);
    throw error;
  }
};
