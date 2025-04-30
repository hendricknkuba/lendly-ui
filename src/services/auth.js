import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData)
    return response.data
  } catch (error) {
    throw error.response.data.data.message || 'Erro ao registrar'
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData)
    return response.data
  } catch (error) {
    throw error.response.data.data.message || 'Erro ao fazer login'
  }
}