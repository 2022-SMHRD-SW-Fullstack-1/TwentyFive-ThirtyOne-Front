// Post에서 보이는 게시한 글의 각각의 정보들 입니다.
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Chip from "./Chip";
import "../post/Blog.css";
import axios from "axios";

const BlogItem = ({
  post: {
    board_seq,
    board_title,
    board_likes,
    board_date,
    mb_nick,
    board_file,
    board_type,
    board_content,
  },
}) => {
  const [cmtNum, setCmtNum] = useState("");
  const [boardLike, setBoardLike] = useState("");

  // 댓글 개수
  axios
    .post("/ittime/commentNumber", {
      board_seq: board_seq,
    })
    .then(function (res) {
      setCmtNum(res.data);
    })
    .catch(function (error) {
      alert("댓글개수실패");
    });

  // 좋아요 개수
  axios
    .post("/ittime/boardLikeNum", {
      board_seq: board_seq,
    })
    .then(function (res) {
      setBoardLike(res.data);
    })
    .catch(function (error) {});

  return (
    <div className="blogItem-wrap">
      <img
        src={board_file === null ? "" : `img/${board_file}`}
        alt="cover"
        className="blogItem-cover"
      />
      <Chip lable={board_type} />
      <h3>{board_title}</h3>
      <p
        className="blogItem-desc"
        dangerouslySetInnerHTML={{ __html: board_content }}
      ></p>
      <footer>
        <div className="blogItem-author">
          <div>
            <h5>{mb_nick}</h5>
            <h5>{cmtNum} comments</h5>
            <h5>{boardLike} Likes</h5>
          </div>
        </div>

        <Link className="blogItem-link" to={`/blog/${board_seq}`}>
          ➝
        </Link>
      </footer>
    </div>
  );
};

export default BlogItem;
