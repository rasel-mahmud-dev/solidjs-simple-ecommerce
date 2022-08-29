import { getAuth, signInWithRedirect, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

export function loginWithGoogle(cb: (user: {} | null)=>void){
    const provider = new GoogleAuthProvider();    
    const auth = getAuth();


    signInWithRedirect(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;


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

export function loginWithPassword(payload: {email: string, password: string}, cb: (user: {} | null, err?: string )=>void){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            cb({
                username: user.displayName,
                avatar: user.photoURL,
                userId: user.uid,
                email: user.email,
            }, "")
        })
        .catch((error) => {
            cb(null, error.message)
        });
}