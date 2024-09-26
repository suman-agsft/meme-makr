export const StorageHelper = {
  getValue: (key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`${key}`);
    }
    return null;
  },
  setValue: (key: string, value: any) => {
    if (typeof window !== 'undefined') {
      return localStorage.setItem(`${key}`, value);
    }
  },
  removeValue: (key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.removeItem(`${key}`);
    }
  },
  clear: () => {
    if (typeof window !== 'undefined') {
      return localStorage.clear();
    }
  },
};