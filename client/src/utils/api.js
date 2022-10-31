import axios from 'axios';
\\ axios.defaults.baseURL = 'http://localhost:5000';

export const fetchNews = () => {
  return axios
    .get('/news')
    .then(response => response.data)
    .catch(error => console.log(error));
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
  savedToken.set(response.data.token);
  return response.data;
};
