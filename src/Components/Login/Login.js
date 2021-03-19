
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import  {initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, handleGithubSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./LogInManager"







function Login() {

  initializeLoginFramework();
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
  });

  const handleResponse = (res, redirect) => {
      setUser(res);
      setLoggedInUser(res);
      if(redirect){
      history.replace(from);
      }
  }

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res=> {
      handleResponse(res,true);
    })
  };

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res=> {
      handleResponse(res,true);
    })
  };

  const githubSignIn = () => {
    handleGithubSignIn()
    .then(res=> {
      handleResponse(res,true);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res=> {
      handleResponse(res,false);
    })
  };

  

  const [loggedInUser,setLoggedInUser] = useContext(UserContext);

  const handleBlur = (event) => {
    let isFormValid = true;
    if (event.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length >= 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res,true);
      })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res,true);
      })
    }
    e.preventDefault();
  };


  return (
    <div style={{textAlign: 'center'}}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={googleSignIn}>Sign in</button>
      )}
      <br />
      <button onClick={fbSignIn}>Faceboo Sign In</button>
      <br />
      <button onClick={githubSignIn}>Github Sign In</button>

      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <div>
        <h1>Our Own Authentication</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="checkbox"
            onChange={() => setNewUser(!newUser)}
            name="newUser"
            id=""
          />
          <label htmlFor="newUser">New User Sign Up</label>
          <br />
          {newUser && (
            <input name="name" type="text" placeholder="Enter Your Name" />
          )}
          <br />
          <input
            type="text"
            onBlur={handleBlur}
            name="email"
            id=""
            placeholder="Enter your email"
            required
          />
          <br />
          <input
            type="password"
            onBlur={handleBlur}
            name="password"
            id=""
            placeholder="Enter your password"
            required
          />
          <br />
          <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
        </form>
        <p style={{ color: "red" }}>{user.error}</p>
        {user.userCreated && (
          <p style={{ color: "green" }}>
            {" "}
            User {newUser ? "created" : "Logged in"} Successfully
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
