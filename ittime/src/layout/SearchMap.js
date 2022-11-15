import React from "react";
import { Link } from "react-router-dom";

const SearchMap = (props) => {
  return (
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
          </div>
        </div>

        <Link className="blogItem-link" to={`/blog/${props.item.board_seq}`}>
          ➝
        </Link>
      </footer>
    </div>
  );
};

export default SearchMap;
