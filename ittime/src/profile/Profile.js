import React, { useEffect, useState } from "react";
import "./profile.css";

import { motion } from "framer-motion";
import ProfileDetail from "./ProfileDetail";
import BoardDetail from "../components/BoardDetail";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .post("ittime/profile", {
        mb_nick: params.nick,
      })
      .then(function (res) {
        setProfile(res.data);
      })
      .catch(function (error) {
        alert("Error");
      });
  }, []);

  useEffect(() => {
    axios
      .get("ittime/getposts")
      .then(function (res) {
        setPosts(res.data);
      })
      .catch(function (error) {
        alert("Error");
      });
  }, []);

  let myPosts = posts
    .filter((post) => params.nick === post.mb_nick)
    .map((item) => <BoardDetail key={item.board_seq} item={item} />);

  return (
    <motion.div
      className="profile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <ProfileDetail item={profile} />
      <div className="posts">{myPosts}</div>
    </motion.div>
  );
};

export default Profile;
