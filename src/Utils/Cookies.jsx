
export const getCookie = (name) => {
    try {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift(); // Return the cookie value
        return null;
    } catch (error) {
        console.error('Cookie get error', error);
        return null;
    }
};

// Function to get a cookie and parse it as JSON
export const getCookieJSON = (name) => {
    try {
        const cookieValue = getCookie(name);
        return cookieValue ? JSON.parse(cookieValue) : null; // Parse JSON if cookie exists
    } catch (error) {
        console.error('Cookie get JSON error', error);
        return null;
    }
};

// Function to set a cookie
export const setCookie = (name, value, days) => {
    try {
        const expires = days ? `; expires=${new Date(Date.now() + days * 864e5).toUTCString()}` : ''; // Set expiration
        document.cookie = `${name}=${value}${expires}; path=/`; // Set the cookie
    } catch (error) {
        console.error('Cookie set error', error);
    }
};

// Function to remove a cookie
export const removeCookie = (name) => {
    try {
        setCookie(name, '', -1); // Set expiration date to the past
    } catch (error) {
        console.error('Cookie remove error', error);
    }
};
