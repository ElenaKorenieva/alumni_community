import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLogin, isRefreshing } from "../redux/auth/authSelectors";

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const isAuth = useSelector(isLogin);
  const isRefreshed = useSelector(isRefreshing);
  const shouldRedirect = !isRefreshed && !isAuth;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};

export const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
  const isAuth = useSelector(isLogin);

  return isAuth ? <Navigate to={redirectTo} /> : <Component />;
};
