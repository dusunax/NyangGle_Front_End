import useAxios from '../hooks/useAxios';

const callApi = (url, token) => {
  const { requestApi } = useAxios();
  return requestApi('get', url, {
    withCredentials: true,
    headers: {
      'X-NYANG-AUTH-TOKEN': token,
    },
  });
};

export const getBreadListData = async (token, callingType, status, lastId, prevId, currentPage) => {
  let url = '';
  if (callingType === 'Next') {
    if (status === 'All') {
      url = `/fishbread?id=${lastId}&page=${currentPage}&callType=next`;
    }
    if (status === 'Read') {
      url = `/fishbread?id=${lastId}&page=${currentPage}&callType=next&status=READ`;
    }
    if (status === 'UnRead') {
      url = `/fishbread?id=${lastId}&page=${currentPage}&callType=next&status=UNREAD`;
    }
  }
  if (callingType === 'Prev') {
    if (status === 'All') {
      url = `/fishbread?id=${prevId}&page=${currentPage}&callType=prev`;
    }
    if (status === 'Read') {
      url = `/fishbread?id=${prevId}&page=${currentPage}&callType=prev&status=READ`;
    }
    if (status === 'UnRead') {
      url = `/fishbread?id=${prevId}&page=${currentPage}&callType=prev&status=UNREAD`;
    }
  } else {
    url = `/fishbread?id=${lastId}&page=${currentPage}`;
  }

  const result = await callApi(url, token);
  return result;
};

export const getBreadDetailData = async (id, token) => {
  const result = await callApi(`/fishbread/${id}`, token);
  return result;
};