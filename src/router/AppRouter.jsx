import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = "non-authenticated";

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <Routes>
      {status === "non-authenticated" ||
      (status === "checking" && !localStorage.getItem("token")) ? (
        <>
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/*" element={<Navigate to="auth" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
