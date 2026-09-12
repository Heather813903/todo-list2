import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }) {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");

  const login = async (userEmail, password) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password,
        }),
        credentials: "include",
      };

      const response = await fetch("/api/users/logon", options);
      const data = await response.json();

      if (response.status === 200 && data.name && data.csrfToken) {
        setName(data.name);
        setToken(data.csrfToken);

        return { success: true };
      }

      return {
        success: false,
        error: "Unable to log in. Please check your email and password.",
      };
    } catch {
      return {
        success: false,
        error: "Network error during login",
      };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        const options = {
          method: "POST",
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        };

        const response = await fetch("/api/user/logoff", options);

        if (!response.ok) {
          throw new Error("Failed to log off");
        }
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    } finally {
      setName("");
      setToken("");
    }
  };

  const value = {
    name,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
