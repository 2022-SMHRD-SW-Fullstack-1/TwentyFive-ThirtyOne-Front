import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Quitprofile.css";

const Quitprofile = () => {
  const pwRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/ittime/quitmember", {
        mb_id: sessionStorage.getItem("id"),
        mb_pw: pwRef.current.value,
      })
      .then(function (res) {
        alert("회원탈퇴에 성공하셨습니다!!");
        sessionStorage.clear();
        window.location.reload();
      })
      .catch(function (error) {
        alert("회원탈퇴에 실패했습니다");
      });
  };

  return (
    <div className="findid">
      <div className="card">
        <div className="left">
          <div className="h1">IT time</div>
          <p>회원 탈퇴</p>
          <input
            className="quitprofile_text"
            maxLength={16}
            type="password"
            ref={pwRef}
            placeholder="비밀번호를 입력해 주세요"
          />

          <Link to="quitmember/home">
            <button
              className="left_button"
              input
              onClick={onSubmit}
              type="submit"
            >
              탈퇴하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Quitprofile;
