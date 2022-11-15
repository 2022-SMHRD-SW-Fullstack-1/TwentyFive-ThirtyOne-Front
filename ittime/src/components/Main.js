import React, { useRef, useState } from "react";
import axios from "axios";

const Main = ({ getAuth }) => {
  const idRef = useRef();
  const pwRef = useRef();

  const btn = (e) => {
    e.preventDefault();
    if (idRef.current.value === "") {
      idRef.current.nextSibling.classList.add("warning");
      setTimeout(function () {
        idRef.current.nextSibling.classList.remove("warning");
      }, 1500);
    } else if (pwRef.current.value === "") {
      pwRef.current.nextSibling.classList.add("warning");
      setTimeout(function () {
        pwRef.current.nextSibling.classList.remove("warning");
      }, 1500);
    } else {
      login();
    }
  };
  function login() {
    axios
      .post("/ittime/login", {
        mb_id: idRef.current.value,
        mb_pw: pwRef.current.value,
      })
      .then(function (res) {
        if (res.data !== "") {
          getAuth(res.data);
        } else {
          alert("아이디와 비밀번호를 확인해주세요");
        }
      })
      .catch(function (error) {
        alert("Login 실패!");
      });
  }

  // signUp 구간 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const [isActive, setIsActive] = useState(false);
  const signUp = (e) => {
    e.preventDefault();
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const signUpIdRef = useRef();
  const signUpPwRef = useRef();
  const nickRef = useRef();
  const emailRef = useRef();
  const ckPwIdRef = useRef();
  const idCkEmailRef = useRef();
  const pwCkEmailRef = useRef();

  //회원가입 제한
  const [mb_id, setMb_id] = useState("");
  const [mb_pw, setMb_pw] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mb_nick, setMb_nick] = useState("");

  const [auth, setAuth] = useState(false);
  const [checkAuth, setCheckAuth] = useState("");

  const [userIdError, setUserIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [ckId, setCkId] = useState(false);
  const [ckNick, setCkNick] = useState(false);

  const [authError, setAuthError] = useState(false);

  const onChangeId = (e) => {
    const userIdRegex = /^[A-Za-z0-9+]{6,16}$/;
    if (!e.target.value || userIdRegex.test(e.target.value))
      setUserIdError(false);
    else setUserIdError(true);
    setMb_id(e.target.value);
  };
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
    const userNameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,12}$/;
    if (!e.target.value || userNameRegex.test(e.target.value))
      setUserNameError(false);
    else setUserNameError(true);
    setMb_nick(e.target.value);
  };

  const onChangeAuth = (e) => {
    if (checkAuth === e.target.value) {
      setAuthError(false);
      setAuth(true);
    } else {
      setAuthError(true);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    axios
      .post("/ittime/mailcheck", {
        checkEmail: emailRef.current.value,
      })
      .then(function (res) {
        alert("Email을 확인해주세요!");
        setCheckAuth(res.data);
      })
      .catch(function (error) {
        alert("Email 전송에 실패했습니다!");
      });
  };
  const idCkEmail = (e) => {
    e.preventDefault();

    axios
      .post("/ittime/mailcheck", {
        checkEmail: idCkEmailRef.current.value,
      })
      .then(function (res) {
        alert("Email을 확인해주세요!");
        setCheckAuth(res.data);
      })
      .catch(function (error) {
        alert("Email 전송에 실패했습니다!");
      });
  };
  const pwCkEmail = (e) => {
    e.preventDefault();

    axios
      .post("/ittime/mailcheck", {
        checkEmail: pwCkEmailRef.current.value,
      })
      .then(function (res) {
        alert("Email을 확인해주세요!");
        setCheckAuth(res.data);
      })
      .catch(function (error) {
        alert("Email 전송에 실패했습니다!");
      });
  };

  const checkId = (e) => {
    e.preventDefault();

    axios
      .post("/ittime/idcheck", {
        mb_id: signUpIdRef.current.value,
      })
      .then(function (res) {
        alert(res.data);
        if (res.data === "사용가능한 아이디 입니다") {
          setCkId(true);
        }
      })
      .catch(function (error) {
        alert("아이디가 없습니다");
      });
  };

  const checkNick = (e) => {
    e.preventDefault();

    axios
      .post("/ittime/nickcheck", {
        mb_nick: nickRef.current.value,
      })
      .then(function (res) {
        alert(res.data);
        if (res.data === "사용가능한 닉네임 입니다") {
          setCkNick(true);
        }
      })
      .catch(function (error) {
        alert("닉네임이 없습니다");
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !userIdError &&
      !passwordError &&
      !confirmPasswordError &&
      !userNameError &&
      auth &&
      ckId &&
      ckNick
    ) {
      axios
        .post("/ittime/signup", {
          mb_id: signUpIdRef.current.value,
          mb_pw: signUpPwRef.current.value,
          mb_nick: nickRef.current.value,
          mb_email: emailRef.current.value,
        })
        .then(function (res) {
          if (res.data === "success") {
            alert("회원가입에 성공하셨습니다!!");
            window.location.reload();
          }
        })
        .catch(function (error) {
          alert("회원가입에 실패했습니다");
        });
    } else if (!ckId) {
      alert("아이디 중복 확인 해주세요");
    } else if (!ckNick) {
      alert("닉네임 중복 환인 해주세요");
    } else {
    }
  };

  // id찾기, pw찾기
  // id찾기, pw찾기

  const [isActiveId, setIsActiveId] = useState(false);
  const findId = (e) => {
    e.preventDefault();
    if (!isActiveId) {
      setIsActivePw(false);
      setIsActiveId(true);
    }
  };
  const findIdSubmit = (e) => {
    e.preventDefault();
    if (auth) {
      axios
        .post("/ittime/findid", {
          mb_email: idCkEmailRef.current.value,
        })
        .then(function (res) {
          alert(res.data);
        })
        .catch(function (error) {
          alert("Error!!");
        });
    } else {
    }
  };

  const [isActivePw, setIsActivePw] = useState(false);
  const findPw = (e) => {
    e.preventDefault();
    if (!isActivePw) {
      setIsActiveId(false);
      setIsActivePw(true);
    }
  };
  const findPwSubmit = (e) => {
    e.preventDefault();
    if (auth) {
      axios
        .post("/ittime/findpw", {
          mb_id: ckPwIdRef.current.value,
          mb_email: pwCkEmailRef.current.value,
        })
        .then(function (res) {
          alert(res.data);
        })
        .catch(function (error) {
          alert("Error!!");
        });
    } else {
    }
  };

  return (
    <div className="mainBody">
      <div className="container">
        <div className="bgimg">
          <img className="logo-white" src="/img/logoWhite-removebg.png"></img>
        </div>
        <section className="login-form">
          <img className="logo" src="/img/logo.png"></img>
          <form action="">
            <div className="int-area">
              <input
                maxLength={16}
                type="text"
                name="id"
                ref={idRef}
                autoComplete="off"
                required
              ></input>
              <label htmlFor="id">USER ID</label>
            </div>
            <div className="int-area">
              <input
                maxLength={16}
                type="password"
                name="pw"
                ref={pwRef}
                autoComplete="off"
                required
              ></input>
              <label htmlFor="pw">PASSWORD</label>
            </div>
            <div className="btn-area">
              <button onClick={btn} type="submit">
                LOGIN
              </button>
            </div>
          </form>
          <div className="mainCaption">
            <span className="caption">
              <a onClick={findId} href="">
                Forgot ID?
              </a>
            </span>
            <span className="caption">
              <a onClick={findPw} href="">
                Forgot Password?
              </a>
            </span>
          </div>
          <div className="int-area">
            <hr></hr>
            <p className="mainOr">또는</p>
            <button>Login With Kakao</button>
          </div>
          <div className="mainSignup">
            Not a Member ?{" "}
            <a onClick={signUp} href="">
              Sign Up
            </a>
          </div>
        </section>
      </div>

      {/* signup 구간 */}
      {/* signup 구간 */}

      <div className={!isActive ? "scrollShow" : "scrollHidden"}>
        <div className={!isActive ? "modalHidden" : "modalShow"}>
          <div className="sign-up">
            <form className="signup-form" action="">
              <h1>IT TIME</h1>
              <h4>It's free and only takes a minute</h4>

              <label>아이디</label>
              <input
                maxLength={16}
                className="shortInput"
                ref={signUpIdRef}
                value={mb_id}
                onChange={onChangeId}
                type="text"
                placeholder="아이디를 입력해주세요"
              />
              <button onClick={checkId}>중복확인</button>
              {userIdError && (
                <div className="invalid-input">
                  <p className="error">아이디는 6~16자입니다.</p>
                </div>
              )}

              <label>비밀번호</label>
              <input
                maxLength={16}
                type="password"
                ref={signUpPwRef}
                value={mb_pw}
                onChange={onChangePassword}
                placeholder="비밀번호"
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
                placeholder="비밀번호확인"
              />
              {confirmPasswordError && (
                <div className="invalid-input">
                  <p className="error">비밀번호가 일치하지 않습니다.</p>
                </div>
              )}

              <label>닉네임</label>
              <input
                maxLength={12}
                className="shortInput"
                ref={nickRef}
                value={mb_nick}
                onChange={onChangeNick}
                type="text"
                placeholder="닉네임을 입력해주세요"
              />
              <button onClick={checkNick}>중복확인</button>
              {userNameError && (
                <div className="invalid-input">
                  <p className="error">2자 ~ 12자 입력해주세요</p>
                </div>
              )}

              <label>본인확인 이메일</label>
              <input
                required
                type="email"
                ref={emailRef}
                placeholder="이메일을 입력해주세요"
              />
              <input
                maxLength={8}
                className="checkInput shortInput"
                onChange={onChangeAuth}
                type="text"
                placeholder="인증번호를 입력해주세요"
              />
              <button onClick={sendEmail}>인증번호받기</button>
              {authError && (
                <div className="invalid-input">
                  <p className="error">인증번호가 같지않습니다</p>
                </div>
              )}
              <input onClick={onSubmit} type="submit" value="가입하기" />
            </form>
          </div>
          <p>
            이미 아이디가 있으신가요? <a href="">Login Here</a>
          </p>
        </div>
      </div>

      {/* 아이디 찾기 구간 */}
      {/* 아이디 찾기 구간 */}

      <div className={!isActiveId ? "scrollShow" : "scrollHidden"}>
        <div className={!isActiveId ? "idModalHidden" : "idModalShow"}>
          <div className="card">
            <div className="left">
              <h1>IT time</h1>
              <p>
                IT time에 오신것을 환영합니다. 예비 개발자 분들을 위한 IT
                time에서 실력을 키워보세요
              </p>
              <span>Did you forget your password?</span>
              <button onClick={findPw} className="left_button">
                Find Pw
              </button>
            </div>
            <div className="right">
              <div className="back">
                <a href="">✖</a>
              </div>
              <div>
                <h1 className="right_top">Find ID</h1>
              </div>
              <div>
                <form className="right_form">
                  <input
                    required
                    className="right_input"
                    type="email"
                    ref={idCkEmailRef}
                    placeholder="Email을 입력해주세요"
                  />
                  <input
                    maxLength={8}
                    className="right_input"
                    onChange={onChangeAuth}
                    type="text"
                    placeholder="인증번호를 입력해주세요"
                  />
                  {authError && (
                    <div className="invalid-input">
                      <p className="error">인증번호가 같지않습니다</p>
                    </div>
                  )}
                  <div className="button">
                    <button onClick={idCkEmail} className="right_button">
                      인증번호받기
                    </button>
                    <button
                      className="right_button"
                      onClick={findIdSubmit}
                      type="submit"
                    >
                      아이디 찾기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 비번 찾기 구간 */}
      {/* 비번 찾기 구간 */}

      <div className={!isActivePw ? "scrollShow" : "scrollHidden"}>
        <div className={!isActivePw ? "pwModalHidden" : "pwModalShow"}>
          <div className="card">
            <div className="left">
              <div>
                <h1>Find PW</h1>
              </div>
              <div>
                <form>
                  <input
                    maxLength={16}
                    ref={ckPwIdRef}
                    type="text"
                    placeholder="아이디를 입력해주세요"
                  />
                  <input
                    required
                    className="right_input"
                    type="email"
                    ref={pwCkEmailRef}
                    placeholder="Email을 입력해주세요"
                  />
                  <input
                    maxLength={8}
                    className="right_input"
                    onChange={onChangeAuth}
                    type="text"
                    placeholder="인증번호를 입력해주세요"
                  />
                  {authError && (
                    <div className="invalid-input">
                      <p className="error">인증번호가 같지않습니다</p>
                    </div>
                  )}
                  <div className="button">
                    <button onClick={pwCkEmail}>인증번호 받기</button>
                    <button onClick={findPwSubmit} type="submit">
                      비밀번호 찾기
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="right">
              <div className="back">
                <a href="">✖</a>
              </div>
              <div className="body">
                <div>
                  <h1>IT time</h1>
                </div>
                <div>
                  <p>
                    IT time에 오신것을 환영합니다. 예비 개발자 분들을 위한 IT
                    time에서 실력을 키워보세요
                  </p>
                </div>
                <div>
                  <span>Did you forget your ID?</span>
                </div>
                <div>
                  <button onClick={findId} type="button">
                    Find ID
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
