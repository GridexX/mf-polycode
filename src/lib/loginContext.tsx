import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User } from './api/user';
import {
  Credentials,
  RefreshUser,
  fetchApiWithAuth,
  CredentialsManager,
} from './api/api';

/*
  Login context.
  This context is used to manage the login state : currently logged user, access token and refresh tokens.

  This context provides the following properties : 
  - user : the currently logged user, undefined means the user data is being fetched, null means no user is logged
  - refreshUser : a function to refresh the user data
  - tokensManager : a structure containing a Credential object (accessToken and refreshToken) and a function to update the tokens

  To log out just set the tokens to undefined.

  Api calls that needs authentication will require the tokensManager to be provided. This allows to refresh the tokens if needed.
*/

interface LoginContextInterface {
  user: User | undefined | null;
  tokensManager: CredentialsManager;
  refreshUser: RefreshUser;
}

/**
 * Reads the local storage for the access and refresh tokens
 * @returns {Credentials | undefined}
 */
function readLocalStorage(): Credentials | undefined {
  const jsonCredentials = localStorage.getItem('credentials');

  if (jsonCredentials) return JSON.parse(jsonCredentials);

  return undefined;
}

/**
 * Writes the tokens in local storage
 * @param credentials {Credentials | undefined}
 */
function writeLocalStorage(credentials: Credentials | undefined) {
  if (credentials) {
    localStorage.setItem('credentials', JSON.stringify(credentials));
  } else {
    localStorage.removeItem('credentials');
  }
}

/**
 * Manages the login status of the user and the tokens
 *
 */
export function useCreateLoginContext(): LoginContextInterface {
  const [user, setUser] = useState<User | undefined | null>(null);
  const [credentials, internalSetCredentials] = useState<
    Credentials | undefined
  >(undefined);

  // Read the local storage at start
  useEffect(() => {
    const localCredentials = readLocalStorage();

    if (localCredentials) internalSetCredentials(localCredentials);
  }, []);

  const setCredentials = useCallback((newCreds: Credentials | undefined) => {
    writeLocalStorage(newCreds);
    internalSetCredentials(newCreds);
  }, []);

  const tokensManager = useMemo(
    () => ({ credentials, setCredentials }),
    [credentials, setCredentials]
  );

  const refreshUser = useCallback(() => {
    if (credentials)
      fetchApiWithAuth<User>('/users/me', tokensManager)
        .then(({ json, status }) => {
          if (status === 200) setUser(json);
          else setUser(null);
        })
        .catch(() => {
          setUser(null);
        });
  }, [credentials, tokensManager]);

  // Fetch the user on credentials change
  useEffect(() => {
    if (credentials) {
      refreshUser();
    } else setUser(null);
  }, [credentials, refreshUser]);

  return { user, tokensManager, refreshUser };
}

/**
 * Create a context for the login state
 */
export const LoginContext = createContext<LoginContextInterface>({
  user: undefined,
  tokensManager: { credentials: undefined, setCredentials: () => {} },
  refreshUser: () => {},
});

export function LoginContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useCreateLoginContext();

  return (
    <LoginContext.Provider value={context}>{children}</LoginContext.Provider>
  );
}

// Retrieves the login context from the context provider
export function useLoginContext() {
  return useContext(LoginContext);
}
