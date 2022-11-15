// component에사용되는 Post 전체 화면 입니다.
import React from "react";
import { Link } from "react-router-dom";
import "../post/Blog.css";

const BlogList = (props) => {
  return (
    <div>
      <div className="blogItem-wrap">
        <img
          src={
            props.item.board_file === null
              ? "img/logo.png"
              : `img/${props.item.board_file}`
          }
          className="blogItem-cover"
        />
        <p className="chip">{props.item.board_type}</p>
        <h3>{props.item.board_title}</h3>
        <p
          className="blogItem-desc"
          dangerouslySetInnerHTML={{ __html: props.item.board_content }}
        ></p>
        <footer>
          <div className="blogItem-author">
            <img src={`img/${props.item.mb_pic}`} />
            <div>
              <h5>{props.item.mb_nick}</h5>
              <h5>{props.item.cmt_count} comments</h5>
              <h5>{props.item.like_count} Likes</h5>
            </div>
          </div>

          <Link className="blogItem-link" to={`/blog/${props.item.board_seq}`}>
            ➝
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default BlogList;
