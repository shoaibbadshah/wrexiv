import { getApps, initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  browserPopupRedirectResolver,
  getAuth,
  initializeAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import type { UserCredential, User } from "firebase/auth";
import { setCookie } from "nookies";

const firebaseConfig = {
  apiKey: "AIzaSyBPVK6s9KDNktnUe-UPyQT4H3FPYkRs8c4",
  authDomain: "globaltalentdb.firebaseapp.com",
  projectId: "globaltalentdb",
  storageBucket: "globaltalentdb.appspot.com",
  messagingSenderId: "868079795963",
  appId: "1:868079795963:web:7359915be67893d10c7a5e",
};

export const getCurrentUser = (): Promise<UserWithAccessToken | null> =>
  new Promise((resolve, reject) => {
    const unsubscribe = getAuth(firebaseApp).onAuthStateChanged(async user => {
      unsubscribe();

      if (user) {
        try {
          // トークンが期限切れかどうかをチェックし、必要に応じてリフレッシュ
          const token = await user.getIdToken(true);
          setCookie(null, "accessToken", token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          resolve({ ...user, accessToken: token });
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(null);
      }
    }, reject);
  });

export type UserWithAccessToken = User & { accessToken: string };

export const getAccessToken = async (): Promise<string | null> => {
  const user = await getCurrentUser();
  return user?.accessToken ?? null;
};

export const firebaseApp = getApps()[0] || initializeApp(firebaseConfig);

export const firebaseAuth =
  getAuth(firebaseApp) ||
  initializeAuth(firebaseApp, {
    persistence: browserLocalPersistence,
    popupRedirectResolver: browserPopupRedirectResolver,
  });

export const googleAuthProvider = new GoogleAuthProvider();

export const signUpToFirebaseAuth = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(firebaseAuth, email, password).then(
    userCredential => {
      sendEmailVerification(userCredential.user).then(() => {
        console.log("Verification email sent.");
      });
      return userCredential;
    }
  );
};

export const signInToFirebaseAuth = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const signOutFromFirebaseAuth = () => {
  return signOut(firebaseAuth)
    .then(() => {
      console.log("Successfully signed out");
    })
    .catch(error => {
      console.error("Sign out error:", error);
    });
};
export const storage = getStorage(firebaseApp);

export const signInWithGoogle = () => {
  return signInWithPopup(firebaseAuth, googleAuthProvider);
};

export const signUpWithGoogle = () => {
  return signInWithPopup(firebaseAuth, googleAuthProvider);
};
