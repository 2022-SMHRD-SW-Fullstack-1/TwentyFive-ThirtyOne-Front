import React, { useEffect, useState } from "react";
import "./NewChat.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import SearchMap from "./SearchMap";
import axios from "axios";
import { motion } from "framer-motion";

const NewChat = () => {
  const navigate = useNavigate();
  const moveBack = () => {
    navigate("/message");
  };

  const [userList, setUserList] = useState([]);

  const [searchText, setSearchText] = useState("");
  const onChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    axios
      .post("/ittime/getUser", {
        mb_nick: sessionStorage.getItem("nick"),
      })
      .then(function (res) {
        setUserList(res.data);
      })
      .catch(function (error) {
        alert("가져오기실패");
      });
  }, []);

  return (
    <motion.div
      className="newChat"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="container">
        <div className="header">
          <div onClick={moveBack} className="iconDiv">
            <FontAwesomeIcon className="icon" icon={faArrowLeft} />
          </div>
          <div className="headerText">새 메세지 보내기</div>
        </div>
        <div className="searchUser">
          <div>
            <input
              onChange={onChange}
              type="text"
              placeholder="Search user Or New chat"
            ></input>
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          </div>
        </div>
        <div className="list">
          {userList
            .filter((item) => {
              if (searchText === "") {
                return item;
              } else if (
                item.mb_nick
                  .toString()
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item) => (
              <SearchMap key={item.mb_id} item={item} />
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NewChat;
