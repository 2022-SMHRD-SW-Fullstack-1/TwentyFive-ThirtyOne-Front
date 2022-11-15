import React, { useEffect, useRef, useState } from "react";
import "./Comment.css";
// import './Blog.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import Ccomment from "./Ccomment";
import { display } from "@mui/system";

const Comment = ({
  comment: { cmt_seq, board_seq, cmt_content, cmt_date, mb_nick, cmt_likes },
}) => {
  const cmtRef = useRef();
  const ccmtRef = useRef();
  const navigate = useNavigate();

  const [editCmt, setEditCmt] = useState({ display: "none" });
  const [editCmtOp, setEditCmtOp] = useState({ display: "block" });
  const editComment = editCmt.display;
  const [ccmt, setCcmt] = useState({ display: "none" });
  const [ccmtOp, setCcmtOp] = useState({ display: "block" });
  const ccmtShow = ccmt.display;
  const [ccmtWrite, setCcmtWrite] = useState({ display: "none" });
  const ccmtWriteShow = ccmtWrite.display;

  const [ccomment, setCcomment] = useState([]);

  const [cmtLikeCheck, setCmtLikeCheck] = useState("");
  const [cmtLikeNum, setCmtLikeNum] = useState("");

  const [ccmtNum, setCcmtNum] = useState("");

  const [memberCheck, setMemberCheck] = useState({ display: "none" });

  // 댓글 삭제
  const cmtDelete = (e) => {
    e.preventDefault();
    axios
      .post("/ittime/commentDelete", {
        mb_nick: sessionStorage.getItem("nick"),
        cmt_seq: cmt_seq,
      })
      .then(function (res) {
        window.location.reload();
      })
      .catch(function (error) {});
  };

  // 댓글 수정
  // 댓글 수정 버튼 클릭 시
  const cmtEdit = (e) => {
    if (editComment === "none") {
      setEditCmt({ display: "" });
      setEditCmtOp({ display: "none" });
    } else {
      setEditCmt({ display: "none" });
      setEditCmtOp({ display: "block" });
    }
  };

  // 수정 기능
  const cmtUpdate = (e) => {
    e.preventDefault();
    axios
      .post("/ittime/commentUpdate", {
        mb_nick: sessionStorage.getItem("nick"),
        cmt_seq: cmt_seq,
        cmt_content: cmtRef.current.value,
      })
      .then(function (res) {
        window.location.reload();
      })
      .catch(function (error) {});
  };

  // 댓글 좋아요 여부
  axios
    .post("/ittime/commentLikeCheck", {
      mb_nick: sessionStorage.getItem("nick"),
      cmt_seq: cmt_seq,
    })
    .then(function (res) {
      setCmtLikeCheck(res.data);
    })
    .catch(function (error) {});

  // 댓글 좋아요 하기
  const commentLike = (e) => {
    e.preventDefault();
    axios
      .post("/ittime/commentLike", {
        mb_nick: sessionStorage.getItem("nick"),
        cmt_seq: cmt_seq,
      })
      .then(function (res) {})
      .catch(function (error) {});
  };

  // 댓글 좋아요 취소
  const commentLikeOp = (e) => {
    e.preventDefault();
    axios
      .post("/ittime/commentLikeOp", {
        mb_nick: sessionStorage.getItem("nick"),
        cmt_seq: cmt_seq,
      })
      .then(function (res) {})
      .catch(function (error) {});
  };

  // 댓글 좋아요 개수
  axios
    .post("/ittime/commentLikeNum", {
      cmt_seq: cmt_seq,
    })
    .then(function (res) {
      setCmtLikeNum(res.data);
    })
    .catch(function (error) {});

  // 대댓글
  // 대댓글 버튼
  const writeCcmtShow = () => {
    if (ccmtWriteShow === "none") {
      setCcmtWrite({ display: "" });
    } else {
      setCcmtWrite({ display: "none" });
    }
  };

  const writeCcmt = () => {
    if (ccmtShow === "none") {
      setCcmt({ display: "block" });
      setCcmtOp({ display: "none" });
    } else {
      setCcmt({ display: "none" });
      setCcmtOp({ display: "block" });
    }
  };

  // 대댓글 보내기
  useEffect(
    (e) => {
      axios
        .post(`/ittime/ccomment/${cmt_seq}`, {
          cmt_seq: cmt_seq,
        })
        .then(function (res) {
          setCcomment(res.data);
          {
            ccomment &&
              ccomment.map((ccomment) => (
                <Ccomment key={ccomment.ak} ccomment={ccomment} />
              ));
          }
        })
        .catch(function (error) {
          // alert("실패")
        });
    },
    [ccomment]
  );

  useEffect(() => {
    {
      ccomment &&
        ccomment.map((ccomment) => (
          <Ccomment key={ccomment.ak} ccomment={ccomment} />
        ));
    }
  }, [ccomment]);

  // 대댓글 입력
  const ccommentWrite = (e) => {
    e.preventDefault();
    axios
      .post("/ittime/ccommentWrite", {
        board_seq: board_seq,
        cmt_seq: cmt_seq,
        mb_nick: sessionStorage.getItem("nick"),
        ccmt_content: ccmtRef.current.value,
      })
      .then(function (res) {
        window.location.reload();
      })
      .catch(function (error) {});
  };
  // 대댓글 개수
  useEffect((e) => {
    axios
      .post("/ittime/ccommentNumber", {
        cmt_seq: cmt_seq,
      })
      .then(function (res) {
        setCcmtNum(res.data);
      })
      .catch(function (error) {});
  }, []);

  // 회원확인
  let mbCheck = sessionStorage.getItem("nick");
  axios
    .post(`/ittime/blog/membercheck`, {
      mb_nick: sessionStorage.getItem("nick"),
    })
    .then(function (res) {
      if (mbCheck === mb_nick) {
        setMemberCheck({ display: "block" });
      } else {
        setMemberCheck({ display: "none" });
      }
    })
    .catch(function (error) {});

  return (
    <>
      <div className="comment_item">
        <img
          src="http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
          className="comment_img"
          alt=""
        />
        <div className="comment_info">
          <div className="comment_span">
            <span>{mb_nick}</span>
            <span className="comment_date">{cmt_date}</span>
            {cmtLikeCheck ? (
              <button onClick={commentLikeOp} className="comment_heart">
                <FavoriteOutlinedIcon fontSize="15px" />
              </button>
            ) : (
              <button onClick={commentLike} className="comment_heart">
                <FavoriteBorderOutlinedIcon fontSize="15px" />
              </button>
            )}
            <span className="comment_likes">{cmtLikeNum} Likes</span>
          </div>
          <div className="comment_blog_p">
            <div>
              <p style={editCmtOp}>{cmt_content}</p>
              <input
                type="text"
                className="comment_update"
                ref={cmtRef}
                defaultValue={cmt_content}
                style={editCmt}
              />
            </div>
            <div>
              <button className="ccomment_button_write" onClick={writeCcmtShow}>
                답글
              </button>
            </div>
            <div className="ccomment_container">
              <input
                type="text"
                className="ccomment_write"
                style={ccmtWrite}
                ref={ccmtRef}
              />
              <button
                className="ccomment_button_write"
                style={ccmtWrite}
                onClick={ccommentWrite}
              >
                제출
              </button>
            </div>
            <div className="ccomment_container">
              <KeyboardArrowDownIcon onClick={writeCcmt} style={ccmt} />
              <KeyboardArrowUpIcon onClick={writeCcmt} style={ccmtOp} />
              <span className="ccmtNum">답글 {ccmtNum}개</span>
            </div>
          </div>
          <div style={ccmt}>
            {ccomment &&
              ccomment.map((ccomment) => (
                <Ccomment key={ccomment.ak} ccomment={ccomment} />
              ))}
          </div>
        </div>

        <div>
          <div className="comment_button_group">
            <button
              className="comment_button_option"
              style={memberCheck}
              onClick={cmtEdit}
            >
              수정하기
            </button>
            <button
              className="comment_button_option"
              style={memberCheck}
              onClick={cmtDelete}
            >
              삭제하기
            </button>
            <div>
              <button
                className="comment_button_update"
                onClick={cmtUpdate}
                style={editCmt}
              >
                수정
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
