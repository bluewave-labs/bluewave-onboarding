import { emitToastError } from "../utils/guideHelper";
import { apiClient } from "./apiClient";

const getStatistics = async () => {
  try {
    const response = await apiClient.get(`/statistics/`);
    return response.data;
  } catch (error) {
    if (error.response.data.errors?.[0].msg) {
      emitToastError(error);
    } else {
      emitToastError({
        response: { data: { errors: [{ msg: error.message }] } },
      });
    }
  }
};

export { getStatistics };
