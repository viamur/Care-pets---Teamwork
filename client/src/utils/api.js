import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export const fetchNews = () => {
  return axios
    .get('/news')
    .then(response => response.data)
    .catch(error => console.log(error));
};
