import axios from "axios";

const getTaskApi = async (id) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  try {
    const res = await axios.get(`${BASE_URL}notes/${id}`, {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    return err?.response?.data?.message;
  }
};

export default getTaskApi;
