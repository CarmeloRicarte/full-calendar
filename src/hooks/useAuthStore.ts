import { useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  RootState,
} from "../store";
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
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth", {
        email,
        password,
      });
      setTokenLocalStorage(data.token);

      dispatch(
        onLogin({
          name: data.name,
          uid: data.uid,
        })
      );
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000);
    }
  };

  const startRegister = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });
      setTokenLocalStorage(data.token);

      dispatch(
        onLogin({
          name: data.name,
          uid: data.uid,
        })
      );
    } catch (error: any) {
      if (error.response.data?.msg) {
        dispatch(onLogout(error.response.data?.msg));
      } else {
        const keyFirstElement = Object.keys(error.response.data?.errors)[0];
        keyFirstElement &&
          dispatch(onLogout(error.response.data?.errors[keyFirstElement]?.msg));
      }

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000);
    }
  };

  const setTokenLocalStorage = (token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem(
      "token-expires-date",
      new Date().getTime() + 2 * 60 * 60 * 1000 + ""
    );
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());
    try {
      const { data } = await calendarApi.get("/auth/renew");

      // logout user if token expired
      const expirationTokenDate = localStorage.getItem("token-expires-date");
      if (expirationTokenDate && +expirationTokenDate < new Date().getTime()) {
        dispatch(onLogout());
      } else {
        setTokenLocalStorage(data);
        dispatch(
          onLogin({
            name: data.name,
            uid: data.uid,
          })
        );
      }
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    //* Properties
    status,
    user,
    errorMessage,
    //* Methods
    startLogin,
    startRegister,
    checkAuthToken,
  };
};
