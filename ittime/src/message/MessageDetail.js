import "./MessageDetail.css";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import MessageMap from "./MessageMap";
import { motion } from "framer-motion";

const MessageDetail = () => {
  const navigate = useNavigate();
  const [chat, setChat] = useState([]);
  const nick = sessionStorage.getItem("nick");
  const [frnd, setFrnd] = useState([]);
  const messageEndRef = useRef(null);
  const params = useParams();
  const [active, setActive] = useState(false);

  useEffect(() => {
    axios
      .post("/ittime/getNick", {
        cr_seq: Number(params.cr_seq),
        to_nick: nick,
      })
      .then(function (res) {
        setFrnd(res.data);
      })
      .catch(function (error) {
        alert("가져오기실패");
      });
  }, []);

  useEffect(() => {
    axios
      .post("/ittime/getMessage", {
        cr_seq: Number(params.cr_seq),
      })
      .then(function (res) {
        setChat(res.data);
        setActive(false);
      })
      .catch(function (error) {
        alert("가져오기실패");
      });
  }, [active]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [chat.length]);

  let chatList = chat.map((item) => (
    <MessageMap key={item.ms_seq} item={item} />
  ));

  const [content, setContent] = useState();

  const sendMessage = (e) => {
    if (content !== "") {
      axios
        .post("/ittime/sendMessage", {
          cr_seq: Number(params.cr_seq),
          content: content,
          from_nick: frnd.mb_nick,
          to_nick: nick,
        })
        .then(function (res) {
          setContent("");
          setActive(true);
        })
        .catch(function (error) {
          alert("Error");
        });
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  const value = (e) => {
    setContent(e.target.value);
  };
  const moveBack = (e) => {
    navigate("/message");
  };
  const moveProfile = (e) => {
    e.preventDefault();
    const userNick = e.target.innerText;
    navigate(`/profile${userNick}`);
  };

  return (
    <motion.div
      className="messageDetailBody"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="container">
        <div className="header">
          <div onClick={moveBack} className="iconBox">
            <FontAwesomeIcon className="icon" icon={faArrowLeft} />
          </div>
          <div onClick={moveProfile} className="move">
            <div className="userImg">
              <img className="cover" src={`img/${frnd.mb_pic}`}></img>
            </div>
            <div className="userName">
              <span>{frnd.mb_nick}</span>
            </div>
          </div>
        </div>

        {/* chatBox */}

        <div className="chatBox">
          {chatList}
          <div ref={messageEndRef}></div>
        </div>

        {/* chatBoxInput */}

        <div className="chatBoxInput">
          <input
            className="chatInput"
            value={content}
            onChange={value}
            onKeyPress={onKeyPress}
            type="text"
            placeholder="Type a message"
          ></input>
          <FontAwesomeIcon
            onClick={sendMessage}
            className="icon"
            icon={faPaperPlane}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MessageDetail;
