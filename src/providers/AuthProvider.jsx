import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import supabase from '../config/supabase';

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.log('Sign up error occurred: ', error);
      return { success: false, error: error.message };
    }

    console.log('Sign up success');
    return { success: true, data };
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.log('Sign in error occurred: ', error);
        return { success: false, error: error.message };
      }

      console.log('Sign in success');
      return { success: true, data };
    } catch {
      console.log('an error occurred: ', error);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log('There was an error', error);
    }
  };

  return <AuthContext.Provider value={{ session, signUp, signOut, signIn }}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => useContext(AuthContext);
