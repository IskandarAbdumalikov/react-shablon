import React, { useEffect, useState } from "react";
import "./header.scss";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Module from "../../module";

const Header = ({ logoTitle }) => {
  const [shrink, setShrink] = useState(false);
  const [closeNavList, setCloseNavList] = useState(false);
  const [module, setModule] = useState(false);

  const handleOpneNavList = () => {
    setCloseNavList(true);
    document.body.style.overflow = "auto";
  };

  const handleCloseNavList = () => {
    setCloseNavList(false);
    setModule(false);
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

  return (
    <header className={shrink ? " show__header-shrink" : ""}>
      <nav className="container header__nav">
        <div
          onClick={handleCloseNavList}
          className={
            closeNavList || module
              ? "nav__overlay show__nav-overlay"
              : "nav__overlay"
          }
        ></div>
        <div className="nav__logo">
          <NavLink to={"/"}>{logoTitle}</NavLink>
        </div>
        <ul className={closeNavList ? "nav__list show__nav-list" : "nav__list"}>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/shopping"}>Shop all</NavLink>
          </li>
          <li>
            <NavLink to={"/blog"}>Blog</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About US</NavLink>
          </li>

          <h1 className="nav__list-closer" onClick={handleCloseNavList}>
            X
          </h1>
        </ul>
        <div className="nav__btns">
          <button onClick={() => setModule(true)}>Open module</button>
          <button>Sign in</button>
          <button>Sign up</button>
          <FaBars onClick={handleOpneNavList} className="nav__bar" />
        </div>
      </nav>
      {module ? <Module closeFunc={setModule} /> : <></>}
    </header>
  );
};

export default Header;
