import React from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import "../css/Share.css";
import { motion } from "framer-motion";

const Share = ({ open }) => {
  if (!open) return null;
  // window 객체에서 현재 url 가져오기
  const currentUrl = window.location.href;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="share_overlay"
    >
      {/* 페이스북 공유 */}
      <div className="iconDiv">
        <FacebookShareButton url={currentUrl}>
          <FontAwesomeIcon className="icon facebook" icon={faFacebook} />
        </FacebookShareButton>
      </div>
      <div className="iconDiv">
        {/* 트위터 공유 */}
        <TwitterShareButton url={currentUrl}>
          <FontAwesomeIcon className="icon twitter" icon={faTwitter} />
        </TwitterShareButton>
      </div>
    </motion.div>
    // </div>
  );
};

export default Share;
