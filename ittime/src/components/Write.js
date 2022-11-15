import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../css/Write.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const mb_nick = sessionStorage.getItem("nick");
  const navigate = useNavigate();
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "img/default_image.png",
  });
  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setImage(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }));
    }
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios.post("/ittime/api/file/upload", formData).then(function (res) {
      setImage({
        image_file: res.data,
        preview_URL: URL.createObjectURL(e.target.files[0]),
      }).catch(function (err) {
        alert("오류");
      });
    });
  };

  const deleteImage = () => {
    // createObjectURL()을 통해 생성한 기존 URL을 폐기
    URL.revokeObjectURL(image.preview_URL);
    setImage({
      image_file: "",
      preview_URL: "img/default_image.png",
    });
  };

  useEffect(() => {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(image.preview_URL);
    };
  }, []);

  const [value, setValue] = useState("");
  const [type, setType] = useState("");

  const titleRef = useRef();

  const clickBtn = (e) => {
    setType(e.target.value);
  };

  const onsubmit = (e) => {
    e.preventDefault();

    if (titleRef.current.value === "") {
      alert("제목을 작성해주세요");
    } else if (value === "") {
      alert("내용을 입력해주세요");
    } else if (type === "") {
      alert("게시판을 선택해주세요");
    } else {
      axios
        .post("/ittime/boardWrite", {
          board_title: titleRef.current.value,
          board_content: value,
          board_file: image.image_file,
          board_type: type,
          mb_nick: mb_nick,
        })
        .then(function (res) {
          alert("게시글 등록 완료!");
          navigate(`/`);
        })
        .catch(function (error) {
          alert("게시물 등록에 실패했습니다!");
        });
    }
  };

  // checkBox 하나만 클릭되게
  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName("category");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      }
    }
  };

  return (
    <motion.iv
      className="add"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="content">
        <input ref={titleRef} type="text" placeholder="Title" />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
        <div className="upload-button">
          <Button
            className="preview"
            type="primary"
            variant="contained"
            onClick={() => inputRef.click()}
          >
            이미지업로드
          </Button>
          <Button className="preview" variant="contained" onClick={deleteImage}>
            삭제
          </Button>
        </div>
        <div className="img-wrapper">
          {image.preview_URL != "img/default_image.png" && (
            <img src={image.preview_URL} width="400px" height="300px" />
          )}
        </div>
      </div>
      <form>
        <div className="menu">
          <div className="item">
            <h1>Category</h1>
            <div className="toy">
              <input
                onClick={clickBtn}
                onChange={(e) => checkOnlyOne(e.target)}
                type="checkbox"
                name="category"
                value="Toy"
                id="toy"
              />
              <label htmlFor="toy">사이드(토이)프로젝트</label>
            </div>

            <div className="error">
              <input
                onClick={clickBtn}
                onChange={(e) => checkOnlyOne(e.target)}
                type="checkbox"
                name="category"
                value="Error"
                id="error"
              />
              <label htmlFor="error">오류게시판</label>
            </div>

            <div className="free">
              <input
                onClick={clickBtn}
                onChange={(e) => checkOnlyOne(e.target)}
                type="checkbox"
                name="category"
                value="Free"
                id="free"
              />
              <label htmlFor="free">자유게시판</label>
            </div>
          </div>
          <button onClick={onsubmit}>글 작성하기</button>
        </div>
      </form>
      <div className="uploader-wrapper">
        <input
          type="file"
          accept="image/*"
          onChange={saveImage}
          // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
          // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
          onClick={(e) => (e.target.value = null)}
          ref={(refParam) => (inputRef = refParam)}
          style={{ display: "none" }}
        />
      </div>
    </motion.iv>
  );
};

export default Write;
