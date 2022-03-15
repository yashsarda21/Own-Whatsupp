import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import User from "../components/User";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setchat] = useState("");
  useEffect(() => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "not-in", [auth.currentUser.uid]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);
  // console.log(users);
  const selectUser = (user) => {
    setchat(user);
  };
  return (
    <div className="home_container">
      <div className="users_container">
        {users.map((user) => (
          <User key={user.uid} user={user} selectUser={selectUser} />
        ))}
      </div>
      <div className="messages_container">
        {chat ? (
          <div className="messages_user ">
            <h3>{chat.name}</h3>
          </div>
        ) : (
          <h3 className="no_conv">Select to start a conversation</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
