import React, { useContext, useState } from "react";
const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = async ({ email, password }) => {
    console.log("Logging in with email:", email);
    console.log("Logging in with password:", password);
  };
const handleRegister = async ({name, email, password }) => {
    console.log("Logging in with name:", name);
    console.log("Logging in with email:", email);
    console.log("Logging in with password:", password);
  };
  return (
    <AuthContext.Provider value={{ user, handleLogin , handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
