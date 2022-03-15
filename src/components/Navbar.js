import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/auth";
import { useHistory } from "react-router-dom";
const Navbar = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history.replace("/Login");
  };

  return (
    <nav>
      <h3>
        <Link to="/">Messanger</Link>
      </h3>
      <div>
        {user ? (
          <>
            <Link to="/Profile">profile</Link>
            <button className="btn" onClick={handleSignout}>
              LogOut
            </button>
          </>
        ) : (
          <>
            <Link to="/Register">Register</Link>
            <Link to="/Login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
