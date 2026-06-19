import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")),
  );
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")));

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        users,
        setUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
