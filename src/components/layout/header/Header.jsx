import React, { useEffect, useState } from "react";
import "./header.scss";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [shrink, setShrink] = useState(false);
  const [closeNavList, setCloseNavList] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleOpneNavList = () => {
    setCloseNavList(true);
    document.body.style.overflow = "auto";
  };

  const handleCloseNavList = () => {
    setCloseNavList(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  {
    closeNavList
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }

  {
    darkMode
      ? (document.body.style.backgroundColor = "black")
      : (document.body.style.backgroundColor = "white");
  }

  {
    darkMode
      ? (document.body.style.color = "white")
      : (document.body.style.color = "black");
  }
  return (
    <header
      id={darkMode ? "dark" : "light"}
      className={shrink ? " show__header-shrink" : ""}
    >
      <nav className="container header__nav">
        <div
          onClick={handleCloseNavList}
          className={
            closeNavList ? "nav__overlay show__nav-overlay" : "nav__overlay"
          }
        ></div>
        <div className="nav__logo">
          <a href="#">LOGO</a>
        </div>
        <ul className={closeNavList ? "nav__list show__nav-list" : "nav__list"}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Shop all</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">About US</a>
          </li>

          <h1 className="nav__list-closer" onClick={handleCloseNavList}>
            X
          </h1>
        </ul>
        <div className="nav__btns">
          <button onClick={handleDarkModeToggle}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button>Sign in</button>
          <button>Sign up</button>
          <FaBars onClick={handleOpneNavList} className="nav__bar" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
