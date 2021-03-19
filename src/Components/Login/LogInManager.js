import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {       
        firebase.initializeApp(firebaseConfig);
    }else {
        firebase.app(); // if already initialized, use that one
    }
}

export const handleGoogleSignIn = () => {
    
  const googleProvider = new firebase.auth.GoogleAuthProvider();
    console.log("Sign in clicked");
    return firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res);
        const { displayName, photoURL, email } = res.user;

        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          userCreated: true,
        };
        return signedInUser;
      })
      .catch((err) => {
        console.log(err);
        console.log(err.messege);
      });
  };

  export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;
        // The signed-in user info.
        let user = result.user;
        user.userCreated = true;
        return user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var accessToken = credential.accessToken;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
      });
  };

  
 export const handleSignOut = () => {
      return firebase
      .auth()
      .signOut()
      .then((res) => {
        // const {displayName, photoURL, email} = res.user;
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          password: "",
          photo: "",
          error: "",
          userCreated: false,
        };
        return signedOutUser;
      })
      .catch((err) => {});
  };


  export const handleGithubSignIn = () => {
    
    const gitProvider = new firebase.auth.GithubAuthProvider();
      return firebase
        .auth()
        .signInWithPopup(gitProvider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
  
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = credential.accessToken;
  
          // The signed-in user info.
          let user = result.user;
          return user;
          console.log(credential,token,user);
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log(errorCode,errorMessage,email,credential);
        });
    };

export const createUserWithEmailAndPassword = (name,email,password) => {
        return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          // Signed in
          // var user = userCredential.user;
          const newUserInfo = res.user;
          newUserInfo.error = "";
          newUserInfo.userCreated = true;
          updateUserName(name);
          return newUserInfo;
          // ...
        })
        .catch((error) => {
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.userCreated = false;

          return newUserInfo;
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
        });
};

export const signInWithEmailAndPassword = (email, password) => {
        return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          // Signed in
          // var user = res.user;
          // ...
          const newUserInfo = res.user;
          newUserInfo.error = "";
          newUserInfo.userCreated = true;
          return newUserInfo;
        })
        .catch((error) => {
          // var errorCode = error.code;
          // var errorMessage = error.message;
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.userCreated = false;
          return newUserInfo;

          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
};




const updateUserName = (name) => {

        const user = firebase.auth().currentUser;
    
        user
          .updateProfile({
            displayName: name,
          })
          .then(function () {
            // Update successful.
            console.log("user name updated successfully");
          })
          .catch(function (error) {
            // An error happened.
            console.log(error);
          });
      };
    