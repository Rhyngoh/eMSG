"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Dashboard from "./dashboard/dashboard";
import SignIn from './signin/page'
import { db } from "@/firebase/firebase.config";
import { collection, getDocs, doc } from "firebase/firestore";
import getData from "@/firebase/firestore/getData";
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export default function Home(props) {
  const { user } = useAuthContext();
  console.log('Current user: ', user);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    //getUsers();
  }, []);
  const getUsers = async () => {
    console.log("getUsers", db);
    const usersCol = collection(db, "users");
    console.log("usersCol", usersCol);
    const userSnapshot = await getDocs(usersCol);
    console.log("userSnapshot", userSnapshot);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    console.log("userList", userList);

    setUsers(userList);
  };
  //console.log("props", users);
  return (
    <>
      {user ? <Dashboard /> : <SignIn />}
    </>
  );
}

// export async function getServerSideProps() {
//   console.log('GetServerSideProps');
//   const usersCol = collection(db, "users");
//   console.log("usersCol", usersCol);
//   const userSnapshot = await getDocs(usersCol);
//   console.log("userSnapshot", userSnapshot);
//   const userList = userSnapshot.docs.map((doc) => doc.data());
//   console.log("userList", userList);
//   return { props: { users: userList } };
//   // return { props: { data}}
// }
