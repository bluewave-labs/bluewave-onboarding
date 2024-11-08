import { apiClient } from "./apiClient";

export const getHelpers = async () => {
  try {
    const response = await apiClient.get(`/helper-link/get_helpers`);
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Get helper link error:", error.response);
    throw error;
  }
};
export const getHelperById = async (id) => {
  try {
    const response = await apiClient.get(`/helper-link/get_helper/${id}`);
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Get helper link error:", error.response);
    throw error;
  }
};

export const createHelper = async (helper, links) => {
  try {
    const response = await apiClient.post(`/helper-link/add_helper`, {
      title: helper.title.trim(),
      headerBackgroundColor: helper.headerBackgroundColor,
      linkFontColor: helper.linkFontColor,
      iconColor: helper.iconColor,
      userId: helper.userId,
      links,
    });
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Create helper link error:", error.message);
    throw error;
  }
};

export const updateHelper = async (helper, links) => {
  try {
    const response = await apiClient.put(
      `/helper-link/edit_helper/${helper.id}`,
      {
        title: helper.title,
        headerBackgroundColor: helper.headerBackgroundColor,
        linkFontColor: helper.linkFontColor,
        iconColor: helper.iconColor,
        userId: helper.userId,
        links,
      }
    );
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Update helper link error:", error.response);
    throw error;
  }
};

export const deleteHelper = async (id) => {
  try {
    const response = await apiClient.delete(`/helper-link/delete_helper/${id}`);
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Delete helper link error:", error.response);
    throw error;
  }
};
