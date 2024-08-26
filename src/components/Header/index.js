import React, { useEffect } from 'react';
import "./styles.css";
import { auth } from '../../pages/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userImg from "../../assets/user.svg";  

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logged Out");
          navigate("/Signup");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="navbar">
        <p className="logo">Financely</p>
      {user && (
        <div className='navbar-link'>
          <img
            src={user.photoURL ? user.photoURL : userImg}
            alt="User"
          />
          <p className="log link" onClick={logoutFnc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
