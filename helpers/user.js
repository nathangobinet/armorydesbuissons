import { useState, useEffect } from 'react';
import config from './config';

/**
 * Dirty react turn arround to share auth state between pages
 */

let user = false;
const authListeners = [];

export function useAuth() {
  const [auth, setAuth] = useState(user);
  useEffect(() => {
    const listener = { key: authListeners.length, set: setAuth };
    authListeners.push(listener);
    return () => {
      const index = authListeners.findIndex((l) => l.key === listener.key);
      authListeners.splice(index, 1);
    };
  }, []);
  return auth;
}

export async function loadUser() {
  const response = await fetch(
    `${config.server}/auth/user`,
    { credentials: 'include' },
  ).then((res) => res.json());
  if (response.success) {
    user = response.result;
    authListeners.forEach((listener) => listener.set(response.result));
  }
}
