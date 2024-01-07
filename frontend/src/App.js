import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../src/pages/login/LoginPage";
import PostsPage from "./pages/posts/PostsPage";
import { useSelector } from "react-redux";
import { isLogin } from "./redux/auth/authSelectors";
import { PrivateRoute } from "./components/AuthRoutes";
import Home from "./components/Home/Home";
import SignUpPage from "./pages/signup/SignUpPage";

function App() {
  const isAuth = useSelector(isLogin);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? <Navigate to="/home" replace={true} /> : <LoginPage />
          }
        />

        <Route
          path="/home"
          element={<PrivateRoute component={Home} redirectTo="/" />}
        />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:topic" element={<PostsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
