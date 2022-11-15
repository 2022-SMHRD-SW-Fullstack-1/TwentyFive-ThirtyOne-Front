// Post 작은 화살표를 클릭시 상세 페이지 입니다.
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

import { Link, useNavigate } from "react-router-dom";
import "../post/Blog.css";
import "./Comment.css";

import axios from "axios";
import Comment from "./Comment";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const Blog = () => {
  const { board_seq } = useParams();
  const [post, setPost] = useState("");
  const [comment, setComment] = useState([]);
  const [commentOpen, setCommentOpen] = useState(false);
  const cmtRef = useRef();
  const [cmtNum, setCmtNum] = useState("");
  const [boardLikeCheck, setBoardLikeCheck] = useState("");
  const [boardLikeNum, setBoardLikeNum] = useState("");

  const navigate = useNavigate();

  // 게시글 값
  useEffect(() => {
    axios
      .post(`/ittime/blog/${board_seq}`, {
        board_seq: board_seq,
      })
      .then(function (res) {
        setPost(res.data[0]);
      })
      .catch(function (error) {});
  }, [board_seq]);

  // 게시글 삭제
  const boardDelete = (e) => {
    e.preventDefault();
    axios
      .post("/ittime/boardDelete", {
        mb_nick: sessionStorage.getItem("nick"),
        board_seq: board_seq,
      })
      .then(function (res) {
        navigate(-1);
      })
      .catch(function (error) {});
  };

  // 댓글쓰기
  const cmtSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/ittime/commentWrite", {
        board_seq: board_seq,
        cmt_content: cmtRef.current.value,
        mb_nick: sessionStorage.getItem("nick"),
      })
      .then(function (res) {
        window.location.reload();
      })
      .catch(function (error) {});
  };

  // 댓글 가져오기
  useEffect(
    (e) => {
      axios
        .post(`/ittime/comment/${board_seq}`, {
          board_seq: board_seq,
        })
        .then(function (res) {
          setComment(res.data);
          {
            comment &&
              comment.map((comment) => (
                <Comment key={comment.ak} comment={comment} />
              ));
          }
        })
        .catch(function (error) {
          // alert("실패")
        });
    },
    [comment]
  );

  // comment의 값이 바뀌었을 때, 어떠한 로직을 진행
  useEffect(() => {
    {
      comment &&
        comment.map((comment) => (
          <Comment key={comment.ak} comment={comment} />
        ));
    }
  }, [comment]);

  // 댓글 개수
  useEffect(
    (e) => {
      axios
        .post("/ittime/commentNumber", {
          board_seq: board_seq,
        })
        .then(function (res) {
          setCmtNum(res.data);
        })
        .catch(function (error) {});
    },
    [comment]
  );

  // 게시글 좋아요 여부
  axios
    .post("/ittime/boardLikeCheck", {
      mb_nick: sessionStorage.getItem("nick"),
      board_seq: board_seq,
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
        board_seq: board_seq,
      })
      .then(function (res) {})
      .catch(function (error) {});
  };

  // 게시글 좋아요 취소
  const boardLikeOp = (e) => {
    e.preventDefault();
    axios
      .post("/ittime/boardLikeOp", {
        mb_nick: sessionStorage.getItem("nick"),
        board_seq: board_seq,
      })
      .then(function (res) {})
      .catch(function (error) {});
  };

  // 게시글 좋아요 개수
  axios
    .post("/ittime/boardLikeNum", {
      board_seq: board_seq,
    })
    .then(function (res) {
      setBoardLikeNum(res.data);
    })
    .catch(function (error) {});

  // 회원확인
  axios
    .post(`/ittime/blog/membercheck`, {
      mb_nick: sessionStorage.getItem("nick"),
    })

    .catch(function (error) {});

  return (
    <>
      <div className="blog-wrap">
        <header>
          <p className="blog-date">{post.board_date}</p>
          <h1>{post.board_title}</h1>
          <div className="blog-subCategory">
            {/* {blog.subCategory.map((category, index) => (
              <div key={index}>
              </div>
            ))} */}
          </div>
        </header>
        <img src={post.board_file} />
        <p
          className="blog-desc"
          dangerouslySetInnerHTML={{ __html: post.board_content }}
        ></p>
      </div>
      <div className="blog-edit">
        <Link className="blog-goBack" to={`/board${board_seq}/edit`}>
          <span>게시물 수정</span>
        </Link>
        <span className="blog-goBack" onClick={boardDelete}>
          게시물 삭제
        </span>
      </div>

      <div className="post_items">
        <div className="item">
          {boardLikeCheck ? (
            <button onClick={boardLikeOp} className="comment_heart">
              <FavoriteOutlinedIcon />
            </button>
          ) : (
            <button onClick={boardLike} className="comment_heart">
              <FavoriteBorderOutlinedIcon />
            </button>
          )}
          {boardLikeNum} Likes
        </div>
        <div onClick={() => setCommentOpen(!commentOpen)}>
          <TextsmsOutlinedIcon />
          {cmtNum}
        </div>
        <div className="homepage_item">
          <ShareOutlinedIcon />
          Share
        </div>
      </div>

      <div className="write_comments">
        <div className="comment_write">
          <img
            src="http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
            className="comment_img"
            alt=""
          />
          <input
            className="comment_input"
            type="text"
            ref={cmtRef}
            placeholder="write a comment"
          />
          <button className="comment_button" onClick={cmtSubmit}>
            Send
          </button>
        </div>

        <div>
          {comment &&
            comment.map((comment) => (
              <Comment key={comment.ak} comment={comment} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
