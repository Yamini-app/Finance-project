// SignupSigninComponent.js

import React, { useState } from 'react';
import "./styles.css";
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from '../../pages/firebase'
import { toast } from 'react-toastify';
import { auth, db, provider, doc, setDoc, getDoc } from  '../../pages/firebase'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password and ConfirmPassword don't match!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  function loginUsingEmail() {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("User Logged in!");
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory");
    }
  }

  async function createDoc(user) {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(userRef, {
          name: name,
          email: email,
          createdAt: new Date(),
        });
        console.log("Document created successfully!");
        toast.success("User profile created successfully!");
        setLoading(false);
      } catch (error) {
        console.error("Error creating user profile document: ", error);
        toast.error("Error creating user profile: " + error.message);
        setLoading(false);
      }
    } else {
      console.log("User profile document already exists!");
      toast.error("User profile already exists!");
    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log("Google user:", user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
          toast.success("User authenticated");
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error("Error during Google authentication: ", error);
          toast.error(errorMessage);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error during Google authentication: ", error);
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">Login on <span style={{ color: "var(--theme)" }}>Financely</span></h2>
          <form>
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"potter@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login using Email and password"}
              onClick={loginUsingEmail}
            />
            <p className="p-login">or</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Login using Google"}
              blue={true}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Don't have an account already? Click here{" "}
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">Sign Up on <span style={{ color: "var(--theme)" }}>Financely</span></h2>
          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"Potter"}
            />
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"potter@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup using Email and password"}
              onClick={signupWithEmail}
            />
            <p className="p-login">or</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Signup using Google"}
              blue={true}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Have an account already? Click here{" "}
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSigninComponent;
