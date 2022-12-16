import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages";
import { CalendarPage } from "../calendar";
import { AUTH_STATUS } from "../store";

export const AppRouter = () => {
  const authStatus: string = AUTH_STATUS.CHECKING;
  return (
    <Routes>
      {authStatus !== AUTH_STATUS.AUTHENTICATED ? (
        <Route path="/auth/*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
