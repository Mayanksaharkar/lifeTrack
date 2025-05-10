import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
const { firebaseauth, db } = require("../firebaseConfig");
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = firebaseauth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoggedIn(!!user);
      setLoading(false);
      
    });
    return unsubscribe;
  }, []);
  if (loading) {
    return null;
  }


  const handleLogin = async ({ email, password }) => {
    signInWithEmailAndPassword(firebaseauth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user);
        setUser(user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error logging in:", errorCode, errorMessage);
        setIsLoggedIn(false);
      })
      .finally(() => {
        console.log("User login status:", isLoggedIn);
      });

    console.log("Logging in with email:", email);
    console.log("Logging in with password:", password);
  };
  const handleRegister = async ({ name, email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseauth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      setIsLoggedIn(true);
      console.log("User registered:", user);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: new Date().toISOString(),
      });

      console.log("User data saved to Firestore");
    } catch (error) {
      setIsLoggedIn(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error registering:", errorCode, errorMessage);
    }

    console.log("Registering with name:", name);
    console.log("Registering with email:", email);
    console.log("Registering with password:", password);
  };
  const handleLogout = () => {
    firebaseauth
      .signOut()
      .then(() => {
        console.log("User logged out");
        setIsLoggedIn(false);
        setUser(null);
      })
      .catch((error) => {
        console.log("Error logging out:", error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        isLoggedIn,
        handleRegister,
        loading,
        handleLogout,
      }}
    >
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
