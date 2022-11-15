import React, { useEffect, useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProfileDetail = (props) => {
  const navigate = useNavigate();
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "img/default_image.png",
  });
  let inputRef;
  let inputRef2;
  const params = useParams();

  const [checkFollow, setCheckFollow] = useState();
  useEffect(() => {
    axios
      .post("ittime/checkfollow", {
        from_nick: params.nick,
        to_nick: sessionStorage.getItem("nick"),
      })
      .then(function (res) {
        res.data === 0 ? setCheckFollow("follow") : setCheckFollow("unfollow");
      })
      .catch(function (error) {
        alert("Error");
      });
  }, []);

  const changeMb_pic = (e) => {
    e.preventDefault();
    if (params.nick === sessionStorage.getItem("nick")) {
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
      formData.append("mb_nick", props.item.mb_nick);
      axios.post("/ittime/api/file/upload", formData).then(function (res) {
        sessionStorage.setItem("pic", res.data);
        window.location.reload();
        setImage({
          image_file: res.data,
          preview_URL: URL.createObjectURL(e.target.files[0]),
        }).catch(function (err) {
          alert("");
        });
      });
    }
  };

  const changeMb_bg = (e) => {
    e.preventDefault();
    if (params.nick === sessionStorage.getItem("nick")) {
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
      formData.append("mb_id", props.item.mb_id);

      axios.post("/ittime/api/file/upload", formData).then(function (res) {
        sessionStorage.setItem("bg", res.data);
        window.location.reload();

        setImage({
          image_file: res.data,
          preview_URL: URL.createObjectURL(e.target.files[0]),
        }).catch(function (err) {
          alert("오류");
        });
      });
    }
  };

  const quitprofile = () => {
    navigate(`/quitprofile`);
  };
  const editprofile = () => {
    navigate(`/editprofile`);
  };
  const message = (e) => {
    e.preventDefault();
    axios
      .post("ittime/newRoom", {
        from_nick: sessionStorage.getItem("nick"),
        to_nick: params.nick,
      })
      .then(function (res) {
        navigate(`/messagedetail${res.data}`);
      })
      .catch(function (error) {
        alert("Error");
      });
  };

  const follow = (e) => {
    e.preventDefault();
    axios
      .post("ittime/follow", {
        from_nick: params.nick,
        to_nick: sessionStorage.getItem("nick"),
      })
      .then(function (res) {
        res.data === "follow"
          ? setCheckFollow("unfollow")
          : setCheckFollow("follow");
      })
      .catch(function (error) {
        alert("Error");
      });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={changeMb_pic}
        onClick={(e) => (e.target.value = null)}
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: "none" }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={changeMb_bg}
        onClick={(e) => (e.target.value = null)}
        ref={(refParam) => (inputRef2 = refParam)}
        style={{ display: "none" }}
      />
      <div>
        <div className="images">
          <img
            type="primary"
            variant="contained"
            onClick={() => inputRef2.click()}
            src={
              props.item.mb_bg === null
                ? "img/logo.png"
                : `img/${props.item.mb_bg}`
            }
            className="cover"
          />
          <img
            type="primary"
            variant="contained"
            onClick={() => inputRef.click()}
            src={`img/${props.item.mb_pic}`}
            className="profilePic"
          />
        </div>
        <div className="profileContainer">
          <div className="uInfo">
            <div className="center">
              <span>{props.item.mb_nick}</span>
              <button
                onClick={follow}
                className={
                  props.item.mb_nick !== sessionStorage.getItem("nick")
                    ? "follow"
                    : "follow hidden"
                }
              >
                {checkFollow}
              </button>
            </div>
            <div className="right">
              <div
                className={
                  props.item.mb_nick !== sessionStorage.getItem("nick")
                    ? "DM"
                    : "DM hidden"
                }
              >
                <EmailOutlinedIcon onClick={message} />
              </div>
              <div
                className={
                  props.item.mb_nick === sessionStorage.getItem("nick")
                    ? "dropdown"
                    : "dropdown hidden"
                }
              >
                <button>
                  <MoreVertIcon className="icon" />
                </button>
                <div className="dropdownMenu">
                  <p onMouseDown={editprofile}>정보수정</p>
                  <p onMouseDown={quitprofile}>회원탈퇴</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
