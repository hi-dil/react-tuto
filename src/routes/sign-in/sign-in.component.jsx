import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils"
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up/sign-up.component";

const SignIn = () => {
  useEffect(() => {
    (async () => {
      const response = await getRedirectResult(auth);
      console.log(response);

      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    })();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);

  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in</button>
      <SignUpForm />
    </div>
  )
}

export default SignIn 