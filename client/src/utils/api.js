import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

const savedToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const getRegisterApi = async userData => {
  const response = await axios.post('/auth/signup', userData);
  return response.data;
};

export const getLoginApi = async userData => {
  const response = await axios.post('/auth/login', userData);
  savedToken.set(response.data.accessToken);
  return response.data;
};
