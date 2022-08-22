import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,
  onLogoutCalendar,
} from "../store";

export const useAuthStore = () => {
  const { status, user, errorMsg, isSubmitting } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      dispatch(clearErrorMessage());
      const { data } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(
        onLogout({
          type: "login",
          error:
            "There was an error with your E-Mail/Password combination. Please try again.",
        })
      );
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/newuser", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(
        onLogout({
          type: "register",
          error:
            error.response.data?.msg || "Please, contact the administrator",
        })
      );
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("/auth/renew");

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  return {
    //Properties
    status,
    isSubmitting,
    user,
    errorMsg,

    //Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
