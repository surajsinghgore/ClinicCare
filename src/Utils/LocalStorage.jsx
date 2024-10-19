export const getLocalStorage = (key) => {
    try {
        const value = localStorage.getItem(key);
        return value || null; 
    } catch (error) {
        console.error('local storage get error', error);
        return null;
    }
};
export const getLocalStorageJSON = (key) => {
    try {
        const value = localStorage.getItem(key);
        return JSON.parse(value) || null; 
    } catch (error) {
        console.error('local storage get error', error);
        return null;
    }
};

export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value); // No need for JSON.stringify if the value is a JWT
    } catch (error) {
        console.error('local storage setItem error', error);
    }
};



export const removeLocalStorage = (key) => {
    try {
        const value = localStorage.removeItem(key)
    } catch (error) {
        console.log('local storage removeItem error', error)
    }
};