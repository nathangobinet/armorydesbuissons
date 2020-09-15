import { useState, useEffect } from 'react';
import config from './config';

/**
 * Dirty react turn arround to share auth state between pages
 */

let user = false;
const authListeners = [];

export function useAuth() {
  const [, setAuth] = useState(user);
  useEffect(() => {
    const listener = { key: authListeners.length, set: setAuth };
    authListeners.push(listener);
    return () => {
      const index = authListeners.findIndex((l) => l.key === listener.key);
      authListeners.splice(index, 1);
    };
  }, []);
  return user;
}

export async function loadUser() {
  const response = await fetch(
    `${config.httpserver}/api/auth/user`,
    { credentials: 'include' },
  ).then((res) => res.json());
  if (response.success) {
    user = response.result;
    authListeners.forEach((listener) => listener.set(response.result));
  }
}

export async function updateUser(updateFunc) {
  user = updateFunc(user);
  authListeners.forEach((listener) => listener.set(user));
}

export function getUrlAction(type) {
  const url = new URL(window.location.href);
  const action = url.searchParams.get('action');
  if (!action) return { isAction: false };
  const parsedMessage = JSON.parse(decodeURIComponent(action));
  if (parsedMessage.type === type) {
    window.history.replaceState(null, null, window.location.pathname); // Remove action from URL
    return { isAction: true, info: parsedMessage };
  }
  return { isAction: false };
}
