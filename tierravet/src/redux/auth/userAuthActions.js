import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { loginFail, loginRequest, loginSuccess, logout } from "./authSlice";
import { auth } from "../../firebase/firebaseConfig";

export const actionRegisterWithEmailAndPassword = ({ email, password, name }) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(
        loginSuccess({
          name: name,
          id: user.uid,
          email: email,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(loginFail(error.message));
    }
  };
};

export const actionLoginWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        loginSuccess({
          id: user.uid,
          email: email,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(loginFail(error.message));
    }
  };
};

export const actionLogout = () => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.error(error);
      dispatch(loginFail(error.message));
    }
  };
};
