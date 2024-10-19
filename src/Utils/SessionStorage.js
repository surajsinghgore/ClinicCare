export const getSessionStorage = (key) => {
  try {
    const value = sessionStorage.getItem(key);
    return value || null; 
  } catch (error) {
    console.error('session storage get error', error);
    return null;
  }
};

export const getSessionStorageJSON = (key) => {
  try {
    const value = sessionStorage.getItem(key);
    return JSON.parse(value) || null; 
  } catch (error) {
    console.error('session storage get error', error);
    return null;
  }
};

export const setSessionStorage = (key, value) => {
  try {
    sessionStorage.setItem(key, value); 
  } catch (error) {
    console.error('session storage setItem error', error);
  }
};

export const setSessionStorageJSON = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value)); 
  } catch (error) {
    console.error('session storage setItem error', error);
  }
};

export const removeSessionStorage = (key) => {
  try {
    sessionStorage.removeItem(key); 
  } catch (error) {
    console.error('session storage removeItem error', error);
  }
};
