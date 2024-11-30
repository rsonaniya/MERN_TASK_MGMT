import axios from "axios";

const updateTaskApi = async (id, body) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  try {
    const res = await axios.patch(`${BASE_URL}notes/${id}`, body, {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    return err?.response?.data?.message;
  }
};

export default updateTaskApi;
