import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../css/Write.css";

import { useNavigate, useParams } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const WriteEdit = () => {
  const { board_seq } = useParams();
  const [value, setValue] = useState("");
  const [boardData, setBoardData] = useState("");
  const navigate = useNavigate();

  const titleRef = useRef();
  const fileRef = useRef();

  useEffect(() => {
    axios
      .post(`/ittime/board/${board_seq}/edit`, {})
      .then(function (res) {
        setBoardData(res.data);
      })
      .catch(function (error) {
        alert("불러오기 실패");
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/ittime/board/update`, {
        board_title: titleRef.current.value,
        board_content: value,
        board_seq: board_seq,
      })
      .then(function (res) {
        alert("수정 성공");
        navigate("/");
      })
      .catch(function (error) {
        alert("수정 실패");
      });
  };

  return (
    <div className="add">
      <div className="content">
        <input
          ref={titleRef}
          type="text"
          defaultValue={boardData.board_title}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
            defaultValue={{ __html: boardData.board_content }}
          />
        </div>
      </div>
      <form>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <input style={{ display: "none" }} type="file" id="file" name="" />
            <label className="file" htmlFor="file">
              Upload Image
            </label>
          </div>

          <button onClick={onSubmit}>글 수정하기</button>
        </div>
      </form>
    </div>
  );
};

export default WriteEdit;
