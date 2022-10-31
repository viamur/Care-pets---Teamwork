import axios from 'axios';

// axios.defaults.baseURL = 'https:';

export const fetchNews = () => {
  return axios
    .get('/news')
    .then(({ data }) => data)
    .catch(error => console.log(error));
};
