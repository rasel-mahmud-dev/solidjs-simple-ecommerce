import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export function loginWithGoogle(cb: (user: {} | null)=>void){
    const provider = new GoogleAuthProvider();    
    const auth = getAuth();
    
    signInWithPopup(auth, provider)

  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    
    cb({
        username: user.displayName,
        avatar: user.photoURL,
        userId: user.uid,
        email: user.email, 
    })
  }).catch((error) => {
    cb(null)
  });
}