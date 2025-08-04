/* eslint-disable no-unused-vars */
import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [individuals, setIndividuals] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  // 🔐 Admin Login
  const login = useCallback(
    async (email, password) => {
      try {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
          setAdmin(data.admin);
          setIsAuth(true);
          navigate("/admin/dashboard");
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        alert("Login failed: " + err.message);
      }
    },
    [navigate]
  );

  // 🧾 Admin Register
  const register = useCallback(
    async (adminData) => {
      try {
        const res = await fetch("/api/admin/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminData),
        });

        const data = await res.json();
        if (res.ok) {
          alert("Registered successfully!");
          navigate("/admin/login");
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        alert("Registration failed: " + err.message);
      }
    },
    [navigate]
  );

  // 👥 Fetch All Individuals & Organizations
  const fetchAllUsersAndOrganizations = useCallback(async () => {
    try {
      const [userRes, orgRes] = await Promise.all([
        fetch("/api/admin/individuals", { credentials: "include" }),
        fetch("/api/admin/organizations", { credentials: "include" }),
      ]);

      const usersData = await userRes.json();
      const orgsData = await orgRes.json();

      if (userRes.ok && orgRes.ok) {
        setIndividuals(usersData.individuals || []);
        setOrganizations(orgsData.organizations || []);
      } else {
        throw new Error("Failed to fetch data.");
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/me", { credentials: "include" });
        const data = await res.json();
        if (res.ok) {
          setIsAuth(true);
          setAdmin(data.admin);
        } else {
          setIsAuth(false);
          setAdmin(null);
        }
      } catch (err) {
        // console.error("Auth check failed:", err.message);
        console.error(err);
        setIsAuth(false);
        setAdmin(null);
      }
    };
    checkAuth();
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      setAdmin(null);
      setIsAuth(false);
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  }, [navigate]);

  // 🧠 Memoized Context Value
  const value = useMemo(
    () => ({
      admin,
      login,
      register,
      logout,
      isAuth,
      setIsAuth,
      individuals,
      organizations,
      fetchAllUsersAndOrganizations,
    }),
    [
      admin,
      login,
      register,
      logout,
      isAuth,
      setIsAuth,
      individuals,
      organizations,
      fetchAllUsersAndOrganizations,
    ]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
