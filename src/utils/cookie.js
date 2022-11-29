//쿠키 저장하는 함수
// setCookie('token', jwtToken, 1000 * 60 * 60 * 24);
function setCookie(name, token, unixTime) {
  let date = new Date();
  date.setTime(date.getTime() + unixTime);
  document.cookie =
    encodeURIComponent(name) +
    '=' +
    encodeURIComponent(token) +
    ';expires=' +
    date.toUTCString() +
    ';path=/';
}

//쿠키 값 가져오는 함수
function getCookie(name) {
  let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
}

//쿠키 삭제하는 함수
function deleteCookie(name) {
  document.cookie = encodeURIComponent(name) + '=; expires=Thu, 01 JAN 1999 00:00:10 GMT';
}

export { setCookie, getCookie, deleteCookie };
