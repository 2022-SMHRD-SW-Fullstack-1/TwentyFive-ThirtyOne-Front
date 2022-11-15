import React, { useEffect, useRef } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Comments from "../components/Comments";
import "../css/Comments.css";
import "../css/BoardDetail.css";
import Share from "./Share";
import axios from "axios";

const BoardDetail = (props) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [commentOpen, setCommentOpen] = useState(false);
  const [openModel, setOpenModal] = useState(false);
  const pic = sessionStorage.getItem("pic");
  const [boardLikeCheck, setBoardLikeCheck] = useState("");

  const [comment, setComment] = useState([]);
  useEffect(() => {
    axios
      .get("ittime/getcomment")
      .then(function (res) {
        setComment(res.data);
        setActive(false);
      })
      .catch(function (error) {
        alert("Error");
      });
  }, [active]);

  const mapComment = comment
    .filter((item) => {
      return props.item.board_seq === item.board_seq;
    })
    .map((item) => <Comments key={item.cmt_seq} item={item} />);

  const MoveDetail = (e) => {
    e.preventDefault();
    navigate(`/profile${props.item.mb_nick}`);
  };

  // 게시글 삭제
  const [isActiveDelete, setIsActiveDelete] = useState(false);
  const boardDeleteModal = (e) => {
    e.preventDefault();
    if (!isActiveDelete) {
      setIsActiveDelete(true);
    }
  };
  const modalExit = (e) => {
    e.preventDefault();
    if (isActiveDelete) {
      setIsActiveDelete(false);
    }
  };

  const boardDelete = (e) => {
    axios
      .post("/ittime/boardDelete", {
        board_seq: props.item.board_seq,
      })
      .then(function (res) {
        alert("삭제성공");
        window.location.reload();
      })
      .catch(function (error) {
        alert("삭제실패");
      });
  };

  //게시글 수정
  const boardUpdate = () => {
    navigate(`/board${props.item.board_seq}/edit`);
  };

  //댓글달기
  const value = (e) => {
    setCmt(e.target.value);
  };
  const [cmt, setCmt] = useState();

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      cmtWrite();
    }
  };
  const cmtWrite = () => {
    if (cmt !== "") {
      axios
        .post("/ittime/commentWrite", {
          board_seq: props.item.board_seq,
          cmt_content: cmt,
          mb_nick: sessionStorage.getItem("nick"),
        })
        .then(function (res) {
          setCmt("");
          setActive(true);
        })
        .catch(function (res) {
          alert("댓글작성실패");
        });
    }
  };

  // 게시글 좋아요 여부
  axios
    .post("/ittime/boardLikeCheck", {
      mb_nick: sessionStorage.getItem("nick"),
      board_seq: props.item.board_seq,
    })
    .then(function (res) {
      setBoardLikeCheck(res.data);
    })
    .catch(function (error) {});

  // 게시글 좋아요 하기
  const boardLike = (e) => {
    e.preventDefault();
    axios
      .post("/ittime/boardLike", {
        mb_nick: sessionStorage.getItem("nick"),
        board_seq: props.item.board_seq,
      })
      .then(function (res) {
        setActive(true);
      })
      .catch(function (error) {});
  };

  // 게시글 좋아요 취소
  const boardLikeOp = (e) => {
    e.preventDefault();
    axios
      .post("/ittime/boardLikeOp", {
        mb_nick: sessionStorage.getItem("nick"),
        board_seq: props.item.board_seq,
      })
      .then(function (res) {
        setActive(true);
      })
      .catch(function (error) {});
  };

  return (
    <div className="boardDetail">
      <div className="user">
        <div className="userInfo">
          <div onClick={MoveDetail}>
            <img src={`img/${props.item.mb_pic}`} />
          </div>
          <div className="details">
            <Link
              to={`/profile${props.item.mb_nick}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className="userName">{props.item.mb_nick}</span>
            </Link>
            <span className="writeDate">{props.item.board_date}</span>
          </div>
        </div>
        <div
          className={
            props.item.mb_nick === sessionStorage.getItem("nick")
              ? "dropdown"
              : "dropdown hidden"
          }
        >
          <button>
            <MoreHorizIcon className="icon" />
          </button>
          <div className="dropdownMenu">
            <p onMouseDown={boardUpdate}>게시글 수정</p>
            <p onMouseDown={boardDeleteModal}>게시글 삭제</p>
          </div>
        </div>
      </div>
      <div className="content">
        <h2 className="title">{props.item.board_title}</h2>
        <img
          src={
            props.item.board_file === null ? "" : `img/${props.item.board_file}`
          }
        />
        <p dangerouslySetInnerHTML={{ __html: props.item.board_content }}></p>
      </div>
      <div className="bottomBar">
        <div></div>
        <div className="like">
          {boardLikeCheck ? (
            <FavoriteOutlinedIcon onClick={boardLikeOp} />
          ) : (
            <FavoriteBorderOutlinedIcon onClick={boardLike} />
          )}
          {props.item.like_count} Likes
        </div>
        <div className="comment" onClick={() => setCommentOpen(!commentOpen)}>
          <TextsmsOutlinedIcon />
          {props.item.cmt_count} Comments
        </div>
        <div className="share">
          <div
            onClick={() => setOpenModal(!openModel)}
            className="sharemodal_button"
          >
            <ShareOutlinedIcon />
            <div>Share</div>
          </div>
          <div className="onShare">
            {openModel && (
              <Share
                open={openModel}
                onclose={() => setOpenModal(!openModel)}
              />
            )}
          </div>
        </div>
        <div></div>
      </div>
      {commentOpen && (
        <div className="comments">
          <div className="comment_write">
            <img src={`/img/${pic}`} className="comment_img" />
            <input
              onKeyDown={onKeyPress}
              value={cmt}
              onChange={value}
              className="comment_input"
              type="text"
              placeholder="write a comment"
            />
            <button onClick={cmtWrite} className="comment_button">
              Send
            </button>
          </div>
          {mapComment}
        </div>
      )}
      <div className={!isActiveDelete ? "scrollShow" : "scrollHidden"}>
        <div className={!isActiveDelete ? "modalHidden" : "modalShow"}>
          <div className="card">
            <div className="header">
              <span>삭제</span>
            </div>
            <div className="content">정말 삭제 하시겠습니까 ?</div>
            <div className="select">
              <span onClick={modalExit}>Cancle</span>
              <span onClick={boardDelete}>OK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
