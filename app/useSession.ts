import { SessionData, defaultSession } from '@/libs/server/auth';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const sessionApiRoute = '/api/session';

async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  console.log('init', init);

  return fetch(input, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    ...init,
  }).then((res) => res.json());
}

function doLogin(url: string, { arg }: { arg: string }) {
  console.log(url);

  return fetchJson<SessionData>(url, {
    method: 'POST',
    body: JSON.stringify({ username: arg }),
  });
}

function doLogout(url: string) {
  return fetchJson<SessionData>(url, {
    method: 'DELETE',
  });
}

export default function useSession() {
  const { data: session, isLoading } = useSWR(
    sessionApiRoute,
    fetchJson<SessionData>,
    {
      fallbackData: defaultSession,
    },
  );

  const { trigger: login } = useSWRMutation(sessionApiRoute, doLogin, {
    // the login route already provides the updated information, no need to revalidate
    revalidate: false,
  });
  const { trigger: logout } = useSWRMutation(sessionApiRoute, doLogout);

  return { session, logout, login, isLoading };
}
