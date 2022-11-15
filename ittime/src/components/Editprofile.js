import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Editprofile = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const nickRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  // 닉네임 중복확인

  const onCheckNick = (e) => {
    e.preventDefault();
    axios
      .post("/ittime/editmember", {
        mb_id: sessionStorage.getItem("id"),
        mb_pw: pwRef.current.value,
        mb_nick: nickRef.current.value,
        mb_email: sessionStorage.getItem("email"),
      })
      .then(function (res) {
        alert("사용가능한 닉네임");
      })
      .catch(function (error) {
        alert("불가능한 닉네임");
      });
  };

  //회원가입 제한
  const [mb_pw, setMb_pw] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mb_nick, setMb_nick] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);

  const onChangePassword = (e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false);
    else setPasswordError(true);

    if (!confirmPassword || e.target.value === confirmPassword)
      setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setMb_pw(e.target.value);
  };
  const onChangePasswordConfirm = (e) => {
    if (mb_pw === e.target.value) setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setConfirmPassword(e.target.value);
  };

  const onChangeNick = (e) => {
    const userNameRegex = /^[A-Za-z0-9+]{4,16}$/;
    if (!e.target.value || userNameRegex.test(e.target.value))
      setUserNameError(false);
    else setUserNameError(true);
    setMb_nick(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!passwordError && !confirmPasswordError && !userNameError) {
      axios
        .post("/ittime/editmember", {
          mb_id: idRef.current.value,
          mb_pw: pwRef.current.value,
          mb_nick: nickRef.current.value,
          mb_email: emailRef.current.value,
        })
        .then(function (res) {
          alert("정보수정에 성공하셨습니다!!");
          goToHome();
        })
        .catch(function (error) {
          alert("정보수정에 실패했습니다");
        });
    } else {
    }
  };
  const testId = sessionStorage.getItem("id");
  const testEmail = sessionStorage.getItem("email");

  return (
    <div className="signup-body">
      <div className="sign-up">
        <form className="signup-form" action="">
          <h1>IT TIME</h1>
          <h4>회원정보 수정</h4>

          <label>아이디</label>
          <input
            maxLength={16}
            className="invalid-input"
            ref={idRef}
            value={testId}
            readOnly
          />

          <label>비밀번호 수정</label>
          <input
            maxLength={16}
            type="password"
            ref={pwRef}
            value={mb_pw}
            onChange={onChangePassword}
            placeholder="비밀번호를 입력해주세요"
          />
          {passwordError && (
            <div className="invalid-input">
              <p className="error">
                숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!
              </p>
            </div>
          )}

          <label>비밀번호 재확인</label>
          <input
            maxLength={16}
            type="password"
            value={confirmPassword}
            onChange={onChangePasswordConfirm}
            placeholder="비밀번호를 입력해주세요"
          />
          {confirmPasswordError && (
            <div className="invalid-input">
              <p className="error">비밀번호가 일치하지 않습니다.</p>
            </div>
          )}

          <label>닉네임 수정</label>
          <input
            maxLength={16}
            className="shortInput"
            ref={nickRef}
            value={mb_nick}
            onChange={onChangeNick}
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
          <button onClick={onCheckNick}>중복확인</button>
          {userNameError && (
            <div className="invalid-input">
              <p className="error">한글 8자, 영문16자이하 입력해주세요.</p>
            </div>
          )}

          <label>본인확인 이메일</label>
          <input
            required
            type="email"
            value={testEmail}
            ref={emailRef}
            readOnly
          />

          <input onClick={onSubmit} type="submit" value="수정하기" />
        </form>
      </div>
    </div>
  );
};

export default Editprofile;
