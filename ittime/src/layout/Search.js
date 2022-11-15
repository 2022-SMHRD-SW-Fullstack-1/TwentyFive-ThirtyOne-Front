import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchMap from "./SearchMap";
import "../post/Blog.css";

const Search = () => {
  const params = useParams();
  const [searchPost, setSearchPost] = useState([]);

  useEffect(() => {
    axios
      .get("/ittime/getposts/")
      .then(function (res) {
        setSearchPost(res.data);
      })
      .catch(function (error) {
        alert("실패");
      });
  }, []);

  return (
    <div className="blogList-wrap">
      {searchPost
        .filter((item) => {
          return item.board_title
            .replace(" ", "")
            .toLocaleLowerCase()
            .includes(params.what.toLocaleLowerCase().replace(" ", ""));
        })
        .map((item) => (
          <SearchMap key={item.board_seq} item={item} />
        ))}
    </div>
  );
};

export default Search;
