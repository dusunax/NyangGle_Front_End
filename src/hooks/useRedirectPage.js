import { useNavigate } from 'react-router-dom';

function useRedirectPage() {
  const navigate = useNavigate();

  function setPage(url) {
    return navigate(url);
  }

  return [setPage];
}

export { useRedirectPage };
