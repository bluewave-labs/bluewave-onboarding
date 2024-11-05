import { apiClient } from "./apiClient";

export const createLink = async (link) => {
  try {
    const response = await apiClient.post(`/link/add_link`, {
      title: link.title,
      url: link.url,
      order: link.order,
      target: link.target ? "_blank" : "_self",
      helperId: link.helperId,
    });
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Update Link error:", error.response);
    throw error;
  }
};

export const getLinks = async (helperId) => {
  try {
    const response = await apiClient.get(`/link/get_links?helperId=${helperId}`);
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Update Link error:", error.response);
    throw error;
  }
};

export const getLinkById = async (id) => {
  try {
    const response = await apiClient.get(`/link/get_link/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get Link error:", error.response);
    throw error;
  }
}

export const updateLink = async (link) => {
  try {
    const response = await apiClient.put(`/link/edit_link/${link.id}`, {
      title: link.title,
      url: link.url,
      order: link.order,
      target: link.target ? "_blank" : "_self",
      helperId: link.helperId
    });
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Update Link error:", error.response);
    throw error;
  }
};

export const deleteLink = async (id) => {
  try {
    const response = await apiClient.delete(`/link/delete_link/${id}`);
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Delete Link error:", error.response);
    throw error;
  }
};
