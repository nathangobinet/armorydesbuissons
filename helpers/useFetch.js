import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:3005';

function fetcher(url, args) {
  const urlWithArg = (args) ? `${url}?${new URLSearchParams(args)}` : url;
  return (fetch(urlWithArg, { credentials: 'include' }).then((res) => res.json()));
}

export default function useFetch(url, defaultResult, args = undefined) {
  const [data, setData] = useState({ result: defaultResult });
  const argsString = JSON.stringify(args); // Used To refetch when args change

  useEffect(() => {
    async function fetch() {
      const result = await fetcher((baseUrl + url), args);
      if (result.success) setData(result);
    }
    fetch();
  }, [argsString]);

  return data.result;
}
