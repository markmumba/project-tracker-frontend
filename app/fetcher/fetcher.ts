import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080",
});

// Add an interceptor to attach the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetcher = async (url: string) => {
  const response = await axiosInstance.get(url, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export default fetcher;
