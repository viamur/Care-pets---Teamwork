import axios from 'axios';

axios.defaults.baseURL = 'https://pet-support.herokuapp.com';

const savedToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const fetchNews = () => {
  return axios
    .get('/news')
    .then(response => response.data.data)
    .catch(error => console.log(error));
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

export const getCheckEmail = async email => {
  const response = await axios.post('/auth/checkemail', email);
  console.log(response.data.check);
  return response.data.check;
};
