interface Admin {
  username: string;
  password: string;
}

const ADMIN_KEY = 'adminCredentials';
const AUTH_TOKEN_KEY = 'authToken';

// Default admin credentials
const defaultAdmin: Admin = {
  username: 'admin',
  password: 'admin123'
};

// Initialize admin credentials if not set
export const initAdminCredentials = (): void => {
  if (typeof window === 'undefined') return;
  
  const existingAdmin = localStorage.getItem(ADMIN_KEY);
  if (!existingAdmin) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(defaultAdmin));
  }
};

// Login function
export const loginAdmin = (username: string, password: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const adminJson = localStorage.getItem(ADMIN_KEY);
    if (!adminJson) {
      initAdminCredentials();
      return false;
    }
    
    const admin = JSON.parse(adminJson) as Admin;
    if (username === admin.username && password === admin.password) {
      // Create a simple token with an expiration of 24 hours
      const token = {
        username,
        exp: Date.now() + 24 * 60 * 60 * 1000
      };
      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const tokenJson = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!tokenJson) return false;
    
    const token = JSON.parse(tokenJson);
    if (token.exp < Date.now()) {
      // Token expired, clear it
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

// Logout function
export const logoutAdmin = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

// Update admin password
export const updateAdminPassword = (currentPassword: string, newPassword: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const adminJson = localStorage.getItem(ADMIN_KEY);
    if (!adminJson) return false;
    
    const admin = JSON.parse(adminJson) as Admin;
    if (currentPassword === admin.password) {
      admin.password = newPassword;
      localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error updating password:', error);
    return false;
  }
}; 