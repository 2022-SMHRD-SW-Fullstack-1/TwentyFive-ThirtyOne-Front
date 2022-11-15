import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../layout/Left.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSignsPost,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faComments,
  faPenToSquare,
  faSun,
  faMoon,
} from "@fortawesome/free-regular-svg-icons";

const Left = ({ mode, getMode, getHeaderName }) => {
  const [theme, setTheme] = useState(mode);
  const [switchMode, setSwitchMode] = useState("Dark Mode");
  const navigate = useNavigate();
  const nick = sessionStorage.getItem("nick");

  const modeSwitch = () => {
    if (mode === "darkMode") {
      setTheme("lightMode");
      setSwitchMode("Dark Mode");
    } else {
      setTheme("darkMode");
      setSwitchMode("Light Mode");
    }
  };
  useEffect(() => {
    getMode(theme);
  }, [theme]);

  const movePage = (e) => {
    e.preventDefault();
    const page = e.target.innerText;
    getHeaderName(page);
    switch (page) {
      case "Home":
        navigate("/");
        break;
      case "Profile":
        navigate(`/profile${nick}`);
        break;
      case "Message":
        navigate("/message");
        break;
      case "Write":
        navigate("/write");
        break;
      case "Post":
        navigate("/post");
        break;
    }
  };

  function logout() {
    sessionStorage.clear();
    navigate("/");
  }
  const moveHome = () => {
    navigate("/");
    getHeaderName("Home");
  };
  return (
    <div className="leftSidebar">
      <header>
        <div className="imgText">
          <span onClick={moveHome} className="leftImg">
            <img src="/img/logo.png"></img>
          </span>
          <div onClick={moveHome} className="leftText leftHeader-text">
            <span className="leftName">IT TIME</span>
          </div>
        </div>
      </header>

      <div className="leftMenuBar">
        <div className="leftMenu">
          <ul className="leftMenuLinks">
            <li onClick={movePage} className="leftNavLink">
              <a href="">
                <FontAwesomeIcon icon={faHouse} className="icon" />
                <span className="leftText leftNavText">Home</span>
              </a>
            </li>
            <li onClick={movePage} className="leftNavLink">
              <a href="">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <span className="leftText leftNavText">Profile</span>
              </a>
            </li>
            <li onClick={movePage} className="leftNavLink">
              <a href="">
                <FontAwesomeIcon icon={faComments} className="icon" />
                <span className="leftText leftNavText">Message</span>
              </a>
            </li>
            <li onClick={movePage} className="leftNavLink">
              <a href="">
                <FontAwesomeIcon icon={faPenToSquare} className="icon" />
                <span className="leftText leftNavText">Write</span>
              </a>
            </li>
            <li onClick={movePage} className="leftNavLink">
              <a href="">
                <FontAwesomeIcon icon={faSignsPost} className="icon" />
                <span className="leftText leftNavText">Post</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="leftBottom">
          <li onClick={logout} className="">
            <a href="">
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="icon"
              />
              <span className="leftText leftNavText">Logout</span>
            </a>
          </li>
          <li className={`leftMode ${mode}`}>
            <div className="moon-sun">
              <FontAwesomeIcon icon={faMoon} className="icon iMoon" />
              <FontAwesomeIcon icon={faSun} className="icon iSun" />
            </div>
            <span className="leftModeText leftText">{switchMode}</span>
            <div onClick={modeSwitch} className="leftToggleSwitch">
              <span className="leftSwitch"></span>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Left;
