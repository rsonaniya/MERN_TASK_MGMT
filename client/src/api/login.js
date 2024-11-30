import axios from "axios";

const loginApi = async (body) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  try {
    const res = await axios.post(`${BASE_URL}auth/sign-in`, body, {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    return err?.response?.data?.message;
  }
};

export default loginApi;
