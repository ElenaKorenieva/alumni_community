import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../src/pages/login/LoginPage";
import PostsPage from "./pages/posts/PostsPage";
import { useSelector } from "react-redux";
import { isLogin } from "./redux/auth/authSelectors";
import { PrivateRoute } from "./components/AuthRoutes";
import SignUpPage from "./pages/signup/SignUpPage";
import HomePage from "./pages/home/HomePage";
import About from "./pages/about/About";
import Header from "./shared/Header/Header";
import Profile from "./pages/profile/Profile";
import Footer from "./shared/Footer/Footer";

function App() {
  const isAuth = useSelector(isLogin);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? <Navigate to="/home" replace={true} /> : <LoginPage />
          }
        />

        <Route
          path="/home"
          element={<PrivateRoute component={HomePage} redirectTo="/" />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:topic" element={<PostsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
