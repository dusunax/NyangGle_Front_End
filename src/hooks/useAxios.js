import axios from 'axios';

export default function useAxios() {
  axios.defaults.baseURL = 'https://www.nyangnyang-letter.xyz/api';

  /**
   * @param {"get" | "post" | "put" | "delete"} method
   * @param {string} url
   * @param {Object} body
   * @returns {Promise}
   */
  const requestApi = (method, url, body) => {
    return axios[method](url, body)
      .then((res) => ({
        status: res.status,
        data: res.data,
      }))
      .catch((err) => {
        console.error('Axios Error', err);

        return {
          status: err.response.status,
          data: {},
        };
      });
  };

  return {
    requestApi,
  };
}
