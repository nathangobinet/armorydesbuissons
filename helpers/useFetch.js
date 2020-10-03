import { useEffect, useState } from 'react';
import config from './config';

function fetcher(url, args) {
  const urlWithArg = (args) ? `${url}?${new URLSearchParams(args)}` : url;
  return (fetch(urlWithArg, { credentials: config.includeCredentials }).then((res) => res.json()));
}

function isNoArg(args) {
  if (!args) return true;
  return Object.values(args).some((v) => v === undefined || v === '');
}

export default function useFetch(url, defaultResult, args = undefined, sendWithNoArg = true) {
  const [data, setData] = useState({ result: defaultResult });
  const argsString = JSON.stringify(args); // Used To refetch when args change
  useEffect(() => {
    async function fetch() {
      const result = await fetcher((config.apiUrl + url), args);
      if (result.success) setData(result);
    }
    if (!(!sendWithNoArg && isNoArg(args))) {
      fetch();
    }
  }, [argsString]);

  return data.result;
}
