import { useState, useEffect, use } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import getGroupsByUser from "@/firebase/firestore/getGroupsByUser";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./../firebase/firebase.config.js";

export default function MainLayout(props) {
  // const [groups, setGroups] = useState([]);
  const { user } = useAuthContext();
  const { children, sidebarOpen, setSidebarOpen } = props;
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "groups"),
        where("users", "array-contains", user.uid)
      );
      const unsub = onSnapshot(q, (docsSnap) => {
        setGroups(docsSnap.docs.map((doc) => doc.data()));
      });
      return unsub;
    }
  }, [user]);
  console.log(groups);

  return (
    <div>
      {user && (
        <>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "Close" : "Open"}
          </button>
          {sidebarOpen && (
            <Sidebar
              groups={groups}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          )}
        </>
      )}
      {children}
    </div>
  );
}
