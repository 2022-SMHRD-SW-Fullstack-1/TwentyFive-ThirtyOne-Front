import React, { useState, useEffect } from "react";
import BlogList from "../post/BlogList";
import axios from "axios";

import "../css/Post.css";

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`/ittime/getposts`)
      .then(function (res) {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch(function (error) {
        alert("실패");
      });
  }, []);

  const [type, setType] = useState("All");

  const btn = (e) => {
    setType(e.target.value);
  };

  const blogList = posts
    .filter((item) => {
      if (type === "All") {
        return item;
      } else if (type === item.board_type) {
        return item;
      }
    })
    .map((item) => <BlogList key={item.board_seq} item={item} />);

  return (
    <div>
      <div className="postAll">
        <button onClick={btn} className="button" value={"All"}>
          전체
        </button>
        <button onClick={btn} className="button" value={"Toy"}>
          인원모집
        </button>
        <button onClick={btn} className="button" value={"Error"}>
          오류게시판
        </button>
        <button onClick={btn} className="button" value={"Free"}>
          자유게시판
        </button>
      </div>
      <div className="blogList-wrap">{blogList}</div>
    </div>
  );
};

export default Post;
