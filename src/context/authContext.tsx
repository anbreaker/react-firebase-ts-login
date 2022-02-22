import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { auth } from '../firebase';

export const authContext = createContext({});

// Personal Hook
export const useAuth = () => {
  const context = useContext(authContext);

  if (!context) throw new Error('There is not auth Provider');

  return context;
};

export const AuthProvider = ({ children }: any) => {
  const [loading, setLoading]: any = useState(true);

  const [user, setUser]: any = useState(null);

  const singUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = async (email: string, password: string) => {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);

    console.log(userCredentials);
  };

  const logout = () => signOut(auth);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = async (email: any) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currrentUser) => {
      setUser(currrentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{ singUp, login, user, logout, loading, loginWithGoogle, resetPassword }}>
      {children}
    </authContext.Provider>
  );
};
