import { useSelector } from "react-redux";
import { calendarApi } from "../api";
import { RootState } from "../store";
import { useAppDispatch } from "./dispatchSelector";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();

  const startLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await calendarApi.post("/auth", {
        email,
        password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Properties
    status,
    user,
    errorMessage,
    //* Methods
    startLogin,
  };
};
