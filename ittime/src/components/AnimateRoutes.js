import React from "react";
import Home from "../home/Home";
import Profile from "../profile/Profile";
import Write from "../components/Write";
import Post from "../components/Post";
import Message from "../message/Message";
import NewChat from "../message/NewChat";
import MessageDetail from "../message/MessageDetail";
import WriteEdit from "./WriteEdit";
import Editprofile from "./Editprofile";
import Quitprofile from "./Quitprofile";
import Search from "../layout/Search";
import Blog from "../post/Blog";

import { AnimatePresence } from "framer-motion";

import { Route, Routes, useLocation } from "react-router-dom";

const AnimateRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/profile:nick" element={<Profile />}></Route>
        <Route path="/write" element={<Write />}></Route>
        <Route path="/post" element={<Post />}></Route>
        <Route path="/board:board_seq/edit" element={<WriteEdit />}></Route>
        <Route path="/blog/:board_seq" element={<Blog />}></Route>
        <Route path="/message" element={<Message />}></Route>
        <Route path="/newchat" element={<NewChat />}></Route>
        <Route path="/messagedetail:cr_seq" element={<MessageDetail />}></Route>
        <Route path="/editprofile" element={<Editprofile />}></Route>
        <Route path="/quitprofile" element={<Quitprofile />}></Route>
        <Route path="/search:what" element={<Search />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimateRoutes;
