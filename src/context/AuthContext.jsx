import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load logged user on refresh
  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    if (!userId) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(u => u.id === userId);
    if (found) setUser(found);
  }, []);

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.email === email)) {
      return { error: "Email already exists" };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      cart: []
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserId", newUser.id);
    setUser(newUser);

    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      u => u.email === email && u.password === password
    );

    if (!found) return { error: "Invalid credentials" };

    localStorage.setItem("currentUserId", found.id);
    setUser(found);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("currentUserId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
