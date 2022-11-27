import useAxios from './useAxios';

/** ( displayFishLimit ) => {
      success: 성공여부,
      sizeAll: 받은 붕어빵 배열
    }  */
export default async function useFetchContentSize() {
  const { requestApi } = useAxios();

  const fetchContentSize = () => {
    let result;

    try {
      // 붕어빵 갯수:number 가져오는 api
      // const responseSize = await requestApi('get', '/api주소')
      let responseSize = 2;

      return (result = {
        success: true,
        sizeAllCount: responseSize,
      });
    } catch (e) {
      console.log(e);
      alert('알 수 없는 에러가 발생했습니다.😭');

      return {
        success: false,
        sizeAllCount: null,
      };
    }
  };

  return { fetchContentSize };
}
