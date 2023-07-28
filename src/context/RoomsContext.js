"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "./../firebase/firebase.config.js";
import { useAuthContext } from "./AuthContext.js";
export const RoomsContext = React.createContext({});

export const useRoomsContext = () => React.useContext(RoomsContext);

export const RoomsContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isSubbed, setIsSubbed] = useState(false);
  useEffect(() => {
    let unsub = () => {};
    if (!user) {
      if (isSubbed) {
        unsub();
        setIsSubbed(false);
        return;
      }
      return;
    } 

    // // console.log('sub to groups');
    const q = query(
      collection(db, "rooms"),
      where("users", "array-contains", user.uid)
    );
    unsub = onSnapshot(q, (docsSnap) => {
      setRooms(docsSnap.docs.map((doc) => doc.data()));
      setIsSubbed(true);
    });
  
    return () => {
      unsub();
      setIsSubbed(false);
    }
  }, [user]);

  // When RoomID changes, fetch messages
  useEffect(() => {
    const q = query(
      collection(db, "rooms", `${currentRoomId}`, "messages"),
      orderBy("created_on", "asc")
    );
    const unsub = onSnapshot(q, (docsSnap) => {
      setMessages(docsSnap.docs.map((doc) => doc.data()));
    });
    return unsub;
  }, [currentRoomId]);
  return (
    <RoomsContext.Provider value={{ currentRoomId, setCurrentRoomId, messages, rooms }}>
      {children}
    </RoomsContext.Provider>
  );
};
