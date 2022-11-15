import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import ChatRoom from "./ChatRoom";

import "./Message.css";
import axios from "axios";
import { motion } from "framer-motion";

const Message = () => {
  const navigate = useNavigate();
  const nick = sessionStorage.getItem("nick");

  // 사진저장경로 img/이미지이름 으로 하기
  const pic = sessionStorage.getItem("pic");

  // 채팅 목록 가져오기
  const [roomId, setRoomId] = useState([]);
  useEffect(() => {
    axios
      .post("/ittime/getChatRoom", {
        mb_nick: nick,
      })
      .then(function (res) {
        setRoomId(res.data);
      })
      .catch(function (error) {
        alert("가져오기실패");
      });
  }, []);
  const myProfile = () => {
    navigate(`/profile${nick}`);
  };

  let roomList = roomId.map((item) => (
    <ChatRoom key={item.cr_seq} item={item} />
  ));

  const NewChat = () => {
    navigate("/newchat");
  };

  return (
    <motion.div
      className="messageBody"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="container">
        <div className="header">
          <div onClick={myProfile} className="userImg">
            <img src={`img/${pic}`}></img>
            <div className="userName">{nick}</div>
          </div>
          <div className="headerIcon">
            <FontAwesomeIcon onClick={NewChat} icon={faSquarePlus} />
          </div>
        </div>
        <div className="list">{roomList}</div>
      </div>
    </motion.div>
  );
};

export default Message;
