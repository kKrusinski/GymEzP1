import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 550) {
        setIsHamburgerClicked(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsLogged(!!localStorage.getItem("token"));
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="nav__logo">
          <img
            src="/images/logo-color.png"
            alt="Logo of our company."
            className="nav__logo__img"
          />
          <h2>
            <Link to="/">MyGym</Link>
          </h2>
        </div>
        <button
          className="nav__hamburger"
          onClick={() => setIsHamburgerClicked(!isHamburgerClicked)}
        >
          <div
            className={`nav__hamburger__line nav__hamburger__line--1 ${
              isHamburgerClicked ? "nav__hamburger__line--active-1" : ""
            }`}
          ></div>
          <div
            className={`nav__hamburger__line nav__hamburger__line--2 ${
              isHamburgerClicked ? "nav__hamburger__line--active-2" : ""
            }`}
          ></div>
          <div
            className={`nav__hamburger__line nav__hamburger__line--3 ${
              isHamburgerClicked ? "nav__hamburger__line--active-3" : ""
            }`}
          ></div>
        </button>
        <div>
          <ul className="nav__list">
            <li>
              <Link to="/about">About</Link>
            </li>
            {isLogged ? (
              <>
                <li style={{ cursor: "pointer" }} onClick={handleLogout}>
                  Logout
                </li>
                <li>
                  <Link to="/myProfil">myProfile</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div
        className={`${
          isHamburgerClicked
            ? "nav__hamburger__content--active"
            : "nav__hamburger__content--inactive"
        }`}
      >
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          {isLogged ? (
            <>
              <li style={{ cursor: "pointer" }} onClick={handleLogout}>
                Logout
              </li>
              <li>
                <Link to="/myProfil">myProfile</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Log In</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
