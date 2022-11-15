import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatRoom = (props) => {
  const navigate = useNavigate();
  const nick = sessionStorage.getItem("nick");

  const MoveDetail = (e) => {
    e.preventDefault();
    navigate(`/messagedetail${props.item.cr_seq}`);
  };

  return (
    <div>
      <div onClick={MoveDetail}>
        <div className="block">
          <div className="userImg">
            <img
              src={
                nick === props.item.from_nick
                  ? `img/${props.item.to_pic}`
                  : `img/${props.item.from_pic}`
              }
            ></img>
          </div>
          <div className="userDetail">
            <div className="listHead">
              <h4>
                {nick === props.item.to_nick
                  ? props.item.from_nick
                  : props.item.to_nick}
              </h4>
              <p className="time">{props.item.send_time}</p>
            </div>
            <div className="lastMessage">
              <p>{props.item.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
