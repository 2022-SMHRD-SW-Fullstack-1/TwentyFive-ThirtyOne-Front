import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faSignsPost,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faComments,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

import "../layout/Header.css";

const Header = ({ headerName }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState("Home");
  const nick = sessionStorage.getItem("nick");
  const searchRef = useRef();

  const movePage = (e) => {
    e.preventDefault();
    const inHtml = e.target.innerHTML;
    const inLH4 = inHtml.indexOf("navText");
    const subL = inHtml.substr(inLH4 + 9);
    const inRH4 = subL.indexOf("<");
    const subR = subL.substr(0, inRH4);
    setPage(subR);
    switch (subR) {
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
  useEffect(() => {
    setPage(headerName);
  }, [headerName]);

  function logout() {
    sessionStorage.clear();
    navigate("/");
  }

  const search = () => {
    navigate(`/search${searchRef.current.value}`);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="headerBody">
      <div className="page">{page}</div>
      <div className="menu">
        <ul className="menuLinks">
          <li onClick={movePage} className="navLink">
            <a href="" className="headerHome">
              <FontAwesomeIcon icon={faHouse} className="icon" />
              <span className="text navText">Home</span>
            </a>
          </li>
          <li onClick={movePage} className="navLink">
            <a href="" className="headerProfile">
              <FontAwesomeIcon icon={faUser} className="icon headerProfile" />
              <span className="text navText">Profile</span>
            </a>
          </li>
          <li onClick={movePage} className="navLink">
            <a href="" className="headerMessage">
              <FontAwesomeIcon
                icon={faComments}
                className="icon headerMessage"
              />
              <span className="text navText">Message</span>
            </a>
          </li>
          <li onClick={movePage} className="navLink">
            <a href="" className="headerWrite">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="icon headerWrite"
              />
              <span className="text navText">Write</span>
            </a>
          </li>
          <li onClick={movePage} className="navLink">
            <a href="" className="headerPost">
              <FontAwesomeIcon icon={faSignsPost} className="icon headerPost" />
              <span className="text navText">Post</span>
            </a>
          </li>
          <li onClick={logout} className="navLink">
            <a href="">
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="icon"
              />
              <span className="text navText">Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="search">
        <input
          onKeyDown={onKeyPress}
          ref={searchRef}
          type="text"
          placeholder="Search"
        ></input>
        <FontAwesomeIcon
          onClick={search}
          className="icon"
          icon={faMagnifyingGlass}
        />
      </div>
    </div>
  );
};

export default Header;
