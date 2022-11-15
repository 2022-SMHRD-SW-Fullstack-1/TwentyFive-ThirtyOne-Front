// 사진 아래에 있는 파란색 박스 입니다. 이것은 각 프로젝트의 카테고리(오류,자유,플젝 게시판) 입니다
import React from "react";
import "../post/Blog.css";

const Chip = ({ lable }) => {
  return <p className="chip">{lable}</p>;
};

export default Chip;
