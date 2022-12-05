import axios from 'axios';

export default function useAxios() {
  axios.defaults.baseURL = '/api';

  // 요청 인터셉터
  axios.interceptors.request.use((config) => {
    const getUser = JSON.parse(localStorage.getItem('user'));

    if (config.headers) {
      config.headers['Content-Type'] = 'application/json';
      // @FIX 조건 처리 필요 (토큰 안쓰는 곳)
      config.headers['Authorization'] = `${getUser.token}`;
    }

    return config;
  });

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
