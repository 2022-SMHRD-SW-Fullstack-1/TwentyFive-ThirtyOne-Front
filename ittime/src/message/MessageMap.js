import React from "react";

const MessageMap = (props) => {
  const nick = sessionStorage.getItem("nick");

  return (
    <div>
      <div
        className={
          nick === props.item.to_nick
            ? "message my_message"
            : "message frnd_message"
        }
      >
        <p>
          {props.item.content}
          <br></br>
        </p>
        <span>{props.item.send_time}</span>
      </div>
    </div>
  );
};

export default MessageMap;
