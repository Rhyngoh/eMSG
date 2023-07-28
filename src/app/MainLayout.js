import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";

export default function MainLayout(props) {
  const { user } = useAuthContext();
  const { children, sidebarOpen, setSidebarOpen } = props;

  return (
    <div>
      {/* {user && (
        <>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "Close" : "Open"}
          </button>
          {sidebarOpen && (
            <Sidebar />
          )}
        </>
      )} */}
      {children}
    </div>
  );
}
