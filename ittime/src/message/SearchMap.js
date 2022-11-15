import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const SearchMap = (props) => {
  const navigate = useNavigate();

  const MoveDetail = (e) => {
    e.preventDefault();
    axios
      .post("ittime/newRoom", {
        from_nick: sessionStorage.getItem("nick"),
        to_nick: e.target.innerText,
      })
      .then(function (res) {
        navigate(`/messagedetail${res.data}`);
      })
      .catch(function (error) {
        alert("Error");
      });
  };

  return (
    <div>
      <div onClick={MoveDetail}>
        <div className="block">
          <div className="userImg">
            <img src={`img/${props.item.mb_pic}`}></img>
          </div>
          <div className="userDetail">
            <div className="listHead">
              <h4>{props.item.mb_nick}</h4>
            </div>
            <div className="lastMessage"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMap;
