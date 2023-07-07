import React, { useRef, useState } from "react";
import "./App.css";

// firebase SDK
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";

// firebase Hooks (makes it easier to use firebase in React)
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// initialize and identify project
firebase.initializeApp({
  // config
  apiKey: "AIzaSyAv32XdTtBfWDtBD7QqhEvQXEJOW-mi1G4",
  authDomain: "emsg-8cce4.firebaseapp.com",
  projectId: "emsg-8cce4",
  storageBucket: "emsg-8cce4.appspot.com",
  messagingSenderId: "586207152588",
  appId: "1:586207152588:web:afc56159b8968fefa83569",
  measurementId: "G-ME5NFJL2YL",
});

// global auth and store variables
const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
  // if user is logged in, returns an object with a user ID and email address (and other info). If logged out, user is null
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    // provide firebase popup with google auth details
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p className="sign-in-terms">
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return (
    // use firebase to check current user
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  // reference to element for scroll purposes
  const dummy = useRef();
  // reference a point in the DB (a firestore collection)
  const messagesRef = firestore.collection("messages");
  // query a subset of documents (limit to mas of 25)
  const query = messagesRef.orderBy("createdAt").limit(25);

  // make the query and listen to any updates in the data (in realtime) with the useCollectionData Hook
  // returns an array of objects where each object is a chat message in the DB
  const [messages] = useCollectionData(query, { idField: "id" });

  // simple form value state and updater
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    // use current user's id and photo
    const { uid, photoURL } = auth.currentUser;
    console.log(auth.currentUser);

    // write a new document to the DB
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    // once resolved, reset form value to empty string
    setFormValue("");
    // scroll to dummy element
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {/* map over each message and pass the Document data as the message prop */}
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        {/* reference to element for scroll purposes */}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  // if the current user id matches the messages id, that massage was "sent" by the current user
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
