import { useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

const useFirebase = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, () => {
      try {
        const user = auth.currentUser;

        setUser(user);

        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  return { isAuthenticated, user };
};

export default useFirebase;
