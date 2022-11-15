import "./Home.css";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BoardDetail from "../components/BoardDetail";
import axios from "axios";
import FollowDetail from "../follow/FollowDetail";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [followInfo, setFollowInfo] = useState([]);
  const nick = sessionStorage.getItem("nick");

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

  useEffect(() => {
    axios
      .post("/ittime/followinfo", {
        to_nick: nick,
      })
      .then(function (res) {
        console.log(res.data);
        setFollowInfo(res.data);
      })
      .catch(function (error) {
        alert("가져오기실패");
      });
  }, []);

  return (
    <motion.div
    className="homepage"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.2 } }}
  >
    <div className="content">
      {posts.map((item) => (
        <BoardDetail item={item} key={item.board_seq} />
      ))}
    </div>


    <div className="right">        
      <div className="follow">
        <div className="body">
        <h3 align="center"> Following</h3>
        {followInfo.map((item) => (
          <FollowDetail key={item.from_nick} item={item} />
        ))}
      </div>
      </div>

      <div className="body">
      <div className="banner">      
        <img src="/img/smhrd.png" width="223x"></img> 
      </div>
     
     </div>
        <div className="cssAni">
          <div className="body">
            <div className="container">
              <div className="cloud"></div>
              <div className="rain">
                <span className="t17"></span>
                <span className="t12"></span>
                <span className="t10"></span>
                <span className="t14"></span>
                <span className="t18"></span>
                <span className="t16"></span>
                <span className="t19"></span>
                <span className="t20"></span>
                <span className="t17"></span>
                <span className="t13"></span>
                <span className="t11"></span>
                <span className="t18"></span>
                <span className="t12"></span>
                <span className="t17"></span>
                <span className="t13"></span>
                <span className="t15"></span>
                <span className="t20"></span>
                <span className="t11"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
