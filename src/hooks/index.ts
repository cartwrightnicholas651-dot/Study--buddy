import { useEffect, useState } from 'react';
import { auth, getUserProfile } from '@/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { User } from '@/types';
import { useAuthStore } from '@/store';

export const useAuth = () => {
  const { user, setUser, setLoading, setError } = useAuthStore();
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userProfile = await getUserProfile(firebaseUser.uid);
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || undefined,
            ...userProfile,
          } as User);
          setAuthUser(firebaseUser);
        } else {
          setUser(null);
          setAuthUser(null);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Auth error');
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [setUser, setLoading, setError]);

  return { user, authUser, isAuthenticated: !!authUser };
};

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return { isDark, toggleTheme };
};

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, isLoaded] as const;
};

export const useDebouncedValue = <T,>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = async () => {
    setStatus('pending');
    setValue(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error as E);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return { execute, status, value, error };
};
