import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import User from "../components/User";
import MessageForm from "../components/MessagesForm";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Message from "../components/Message";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setchat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [messages, setMessages] = useState([]);

  const user1 = auth.currentUser.uid;
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
  const selectUser = async (user) => {
    setchat(user);
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const messagesRef = collection(db, "messages", id, "chat");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);
    });

    //get a last message login user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    // if last message exists and message from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      //update last message doc , set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unRead: false });
    }
  };
  // console.log(messages);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let url;
    if (img) {
      const imgref = ref(
        storage,
        "images/${new Date().getTimme()} - ${img.name}"
      );
      const snap = await uploadBytes(imgref, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }
    // (messages) => (id) => (chat) => addDoc;
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });
    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unRead: true,
    });
    setText("");
  };
  return (
    <div className="home_container">
      <div className="users_container">
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
      </div>
      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user ">
              <h3>{chat.name}</h3>
            </div>
            <div className="messages">
              {messages.length
                ? messages.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h3 className="no_conv">Select to start a conversation</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
