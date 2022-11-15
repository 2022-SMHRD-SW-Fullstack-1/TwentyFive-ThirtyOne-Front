import React from "react";
import { useNavigate } from "react-router-dom";

import "./FollowDetail.css";

const FollowDetail = (props) => {
  const navigate = useNavigate();

  const myProfile = () => {
    navigate(`/profile${props.item.from_nick}`);
  };

  return (
    <div className="followBody">
      <div className="Img" onClick={myProfile}>
        <img
          src={`img/${props.item.mb_pic}`}
          width="35px"
          align="left"
          className="userImg"
        ></img>{" "}
        <h5 className="userName">{props.item.from_nick}</h5>
      </div>
    </div>
  );
};

export default FollowDetail;
