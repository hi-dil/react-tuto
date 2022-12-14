import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAalCCoNkwSOE9wq44jZBzMHyyBh8LsYHw",
  authDomain: "crwn-clothing-db-5b292.firebaseapp.com",
  projectId: "crwn-clothing-db-5b292",
  storageBucket: "crwn-clothing-db-5b292.appspot.com",
  messagingSenderId: "506728855998",
  appId: "1:506728855998:web:698ae9b25e9f83ceb5e1ef"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);


  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  // if user data exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt})
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }  

  return userDocRef;
};