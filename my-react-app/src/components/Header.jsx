import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/Authentification/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get authentication state from Redux store
  const { token } = useSelector((state) => state.auth);
  const isAuthenticated = !!token; // isAuthenticated devient vrai si un token existe.
  const { profile } = useSelector((state) => state.user);
  const userName = profile?.username;

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/assets/argentBankLogo.webp"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {userName}
            </Link>
            <Link className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
