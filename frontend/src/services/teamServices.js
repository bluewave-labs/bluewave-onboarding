import { ROLE } from "../../../backend/src/utils/constants";
import { apiClient } from "./apiClient";

const baseEndpoint = "team/";

export const sendInvites = async (memberEmails) => {
  try {
    const response = await Promise.all(
      memberEmails.map(async (email) => {
        const response = await apiClient.post(baseEndpoint + "invite", {
          invitedEmail: email,
          role: ROLE.MEMBER,
        });
        return response.data;
      })
    );
    return response;
  } catch (err) {
    console.error('Error sending invites: ', err.response);
    throw err;
  }
};

export const setOrganization = async (name) => {
  try {
    const response = await apiClient.post(baseEndpoint + "set-organisation", {
      name
    })
    return response.data;
  } catch (err) {
    console.error('Error setting organization: ', err.response);
    throw err;
  }
};