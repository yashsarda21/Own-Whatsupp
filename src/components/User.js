import React, { useEffect, useState } from "react";
import img from "../minion.png";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
const User = ({ user, selectUser, user1, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");
  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unSub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unSub();
  }, []);
  return (
    <>
      <div
        className={"user_wrapper ${chat.name===user.name && 'selected_user'}"}
        onClick={() => selectUser(user)}
      >
        <div className="user_info">
          <div className="user_detail">
            <img src={img} className="avatar"></img>
            <h4>{user.name}</h4>
            {data?.from !== user1 && data?.unRead && (
              <small className="unread">New</small>
            )}
          </div>
          <div
            className={`user_status ${user.isOnline ? "online" : "offline"}`}
          ></div>
        </div>
        {data && (
          <p className="truncate">
            <strong>{data.from === user1 ? "Me: " : null}</strong>
            {data.text}
          </p>
        )}
      </div>
      <div
        onClick={() => selectUser(user)}
        className={"sm_container ${chat.name===user.name && 'selected_user'}"}
      >
        <img src={img} className="avatar sm_screen"></img>
      </div>
    </>
  );
};

export default User;
