import authClient from "./loginServices";

export const updateLink = async (link) => {
  try {
    const response = await authClient.put(`/link/${link.id}`, {
      title: link.title,
      url: link.url,
      order: link.order,
    });
    if (response.status >= 400) throw new Error(response.data);
    return response.data;
  } catch (error) {
    console.error("Update Link error:", error.response);
    throw error;
  }
};
