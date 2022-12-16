import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { AUTH_STATUS } from "../store";

export const AppRouter = () => {
  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === AUTH_STATUS.CHECKING) {
    return <h3>Loading...</h3>;
  } else {
  }

  return (
    <Routes>
      {status !== AUTH_STATUS.AUTHENTICATED ? (
        <Route path="/auth/*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
