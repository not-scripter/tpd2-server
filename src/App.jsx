import React, { useEffect, useState } from "react";
import { Footer, Header, Loader, Toaster } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthServices from "./appwrite/AuthServices";
import { login, logout } from "./store/AuthSlice";
  
export default function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    AuthServices.getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login(userData));
        else dispatch(logout());
      })
      .finally(setloading(false));
  }, []);

  return !loading ? (
    <main className="min-h-dvh flex flex-col bg-zinc-900 text-white">
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </main>
  ) : (
    <Loader />
  );
}
