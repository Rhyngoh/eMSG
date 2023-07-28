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
  const [isSubbed, setIsSubbed] = useState(false);
  useEffect(() => {
    let unsub = () => {};
    // // // console.log('useEffect', isSubbed, sidebarOpen, user);
    if (isSubbed) return;
    if (sidebarOpen) {
      if (user) {
        // // // console.log('sub to groups');
        const q = query(
          collection(db, "groups"),
          where("users", "array-contains", user.uid)
        );
        unsub = onSnapshot(q, (docsSnap) => {
          setGroups(docsSnap.docs.map((doc) => doc.data()));
        });
        setIsSubbed(true);
      }
    } else {
      // // // console.log('sidebar closed');
      unsub();
      setIsSubbed(false);
    }
    return () => {
      // // // console.log('clean up');
      unsub();
      setIsSubbed(false);
    };
  }, [user, sidebarOpen]);
  // // // console.log(groups);

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
