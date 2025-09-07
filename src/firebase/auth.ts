import { auth } from './init.ts'
import { sendSignInLinkToEmail, createUserWithEmailAndPassword, signInWithEmailLink, isSignInWithEmailLink, onAuthStateChanged, signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import type { User } from "firebase/auth";

const actionCodeSettings = {
  "url": location.origin + '/sign-in/confirm',
  "handleCodeInApp": true,
};

const localStoreageId = 'emailForSignIn';

export const authAnonymously = async (): Promise<User> => {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const signInEmailPassword = async ({email, password}: {email: string, password: string}): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const checkAuthentication = async (): Promise<{isAuthenticated: boolean, user?: User}> => await new Promise((resolve, reject) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe();

    if (user) {
      resolve({isAuthenticated: true, user})
    } else {
      resolve({isAuthenticated: false})
    }
  }, (error) => {
    reject(error)
  });
});

export const getCurrentUser = (): User | Error => {
  const user = auth.currentUser;
  if (user) {
    return user
  }

  return new Error('no current user')
}

export const getIdToken = async (): Promise<string> => {
  const token = await auth.currentUser!.getIdToken(true);
  return token
};

export const signOut = (): Promise<void> => auth.signOut();

export const sendSignInLink = async ({email}: {email: string}): Promise<boolean | Error> => {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem(localStoreageId, email);
    return true
  } catch (err) {
    return new Error(err as string)
  }
}

export const isSignInLink = ({link}: {link: string}): boolean => isSignInWithEmailLink(auth, link)

export const signInWithLink = async ({link, email = null}: {link: string, email?: string | null}): Promise<User | Error> => {
  try {
    if (isSignInWithEmailLink(auth, link)) {
      email = email ? email : window.localStorage.getItem(localStoreageId);
  
      if (!email) {
        throw 'no_email'
      }

      const result = await signInWithEmailLink(auth, email, link);

      if (result) {
        window.localStorage.removeItem(localStoreageId);
        return result.user;
      } else {
        throw 'login_failed'
      }

    } else {
      throw 'invalid_auth_link'
    }
  } catch (err) {
    return new Error(err as string)
  }
}

export const signUpEmailPassword = async ({email, password}: {email: string, password: string}): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
