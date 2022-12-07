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
      url = `/fishbread?fishId=${lastId}&page=${currentPage}&callType=next&size=45`;
    }
    if (status === 'Read') {
      url = `/fishbread?fishId=${lastId}&page=${currentPage}&callType=next&status=READ&size=45`;
    }
    if (status === 'UnRead') {
      url = `/fishbread?fishId=${lastId}&page=${currentPage}&callType=next&status=UNREAD&size=45`;
    }
  } else if (callingType === 'Prev') {
    if (status === 'All') {
      url = `/fishbread?fishId=${prevId}&page=${currentPage}&callType=prev&size=45`;
    }
    if (status === 'Read') {
      url = `/fishbread?fishId=${prevId}&page=${currentPage}&callType=prev&status=READ&size=45`;
    }
    if (status === 'UnRead') {
      url = `/fishbread?fishId=${prevId}&page=${currentPage}&callType=prev&status=UNREAD&size=45`;
    }
  } else {
    if (status === 'All') {
      url = `/fishbread?fishId=0&page=${currentPage}&size=45`;
    }
    if (status === 'Read') {
      url = `/fishbread?fishId=0&page=${currentPage}&status=READ&size=45`;
    }
    if (status === 'UnRead') {
      url = `/fishbread?fishId=0&page=${currentPage}&status=UNREAD&size=45`;
    }
  }

  const result = await callApi(url, token);
  return result;
};

export const getBreadDetailData = async (fishId, token) => {
  const result = await callApi(`/fishbread/${fishId}`, token);
  return result;
};
