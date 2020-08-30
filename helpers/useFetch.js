import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:3005/api/';

function fetcher(url, method, args) {
  // POST
  if (method === 'POST' && args) {
    return (fetch(url, {
      method: 'post',
      body: JSON.stringify(args),
      headers: { 'Content-type': 'application/json' },
    }).then((res) => res.json()));
  }
  // GET
  const urlWithArg = (args) ? `${url}?${new URLSearchParams(args)}` : url;
  return (fetch(urlWithArg).then((res) => res.json()));
}

export default function useFetch(url, defaultResult, args = undefined, method = 'GET') {
  const [data, setData] = useState({ result: defaultResult });
  const argsString = JSON.stringify(args); // Used To refetch when args change

  useEffect(() => {
    async function fetch() {
      const result = await fetcher((baseUrl + url), method, args);
      if (result.success) setData(result);
    }
    fetch();
  }, [argsString]);

  return data.result;
}
