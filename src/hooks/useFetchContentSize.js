/** ( displayFishLimit ) => {
      success: 성공여부,
      sizeAll: 받은 붕어빵 배열
    }  */
export default async function useFetchContentSize(displayFishLimit) {
  let result;

  try {
    // 붕어빵 갯수:number 가져오는 api
    // const responseSize = await requestAxios('/??')
    let responseSize = 2;
    let comparedSize = responseSize <= displayFishLimit ? responseSize : displayFishLimit;

    console.log(comparedSize, responseSize, displayFishLimit);

    return (result = {
      success: true,
      sizeAll: [...new Array(comparedSize).keys()],
    });
  } catch (e) {
    console.log(e);
    alert('알 수 없는 에러가 발생했습니다.😭');

    return {
      success: false,
      sizeAll: null,
    };
  }
}
