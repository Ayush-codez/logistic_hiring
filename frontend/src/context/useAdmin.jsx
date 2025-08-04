// useAdmin.jsx
import { useContext } from "react";
// import { AdminContext } from "./AdminProvider"; // <-- Fix this line
import { AdminContext } from "./AdminProvider";

const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export default useAdmin;
