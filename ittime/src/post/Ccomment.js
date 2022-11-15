import './Comment.css'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";


const Ccomment = ({
  ccomment: {
    ccmt_seq,
    cmt_seq,
    ccmt_content,
    ccmt_date,
    mb_nick,
  },
}) => {

  const [ccmtLikeCheck, setCcmtLikeCheck] = useState("");
  const [ccmtLikeNum, setCcmtLikeNum] = useState("");

  const [memberCheck, setMemberCheck] = useState({ display: 'none' });

  // 대댓글 좋아요 여부
  axios
    .post("/ittime/ccommentLikeCheck", {
      mb_nick: sessionStorage.getItem("nick"),
      ccmt_seq: ccmt_seq,
    })
    .then(function (res) {
      setCcmtLikeCheck(res.data)
    })
    .catch(function (error) {
    });

  // 대댓글 좋아요 하기
  const ccommentLike = (e) => {
    e.preventDefault();
    axios
      .post("/ittime/ccommentLike", {
        mb_nick: sessionStorage.getItem("nick"),
        ccmt_seq: ccmt_seq,
      })
      .then(function (res) {
      })
      .catch(function (error) {
      });
  }

  // 대댓글 좋아요 취소
  const ccommentLikeOp = (e) => {
    e.preventDefault();
    axios
      .post("/ittime/ccommentLikeOp", {
        mb_nick: sessionStorage.getItem("nick"),
        ccmt_seq: ccmt_seq,
      })
      .then(function (res) {
      })
      .catch(function (error) {
      });
  }

  // 대댓글 좋아요 개수  
  axios
    .post("/ittime/ccommentLikeNum", {
      ccmt_seq: ccmt_seq,
    })
    .then(function (res) {
      setCcmtLikeNum(res.data)
    })
    .catch(function (error) {
    });


  // 대댓글 삭제
  const ccmtDelete = (e) => {
    e.preventDefault();
    axios
      .post("/ittime/ccommentDelete", {
        mb_nick: sessionStorage.getItem("nick"),
        ccmt_seq: ccmt_seq,
      })
      .then(function (res) {
        window.location.reload()
        alert("삭제성공")
      })
      .catch(function (error) {
        alert("삭제실패")
      });

  }

  let mbCheck = sessionStorage.getItem("nick")

  // 회원확인
  axios
    .post(`/ittime/blog/membercheck`, {
      mb_nick: sessionStorage.getItem("nick"),
    })
    .then(function (res) {
      if (mbCheck === mb_nick) {
        setMemberCheck({ display: 'block' })
      } else {
        setMemberCheck({ display: 'none' })
      }
    })
    .catch(function (error) {
    });

 

  return (
    <>
      <div className='ccomment_item'>
        <img src="http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg" className='comment_img' alt='' />
        <div className='comment_info'>
          <div className='comment_span'>
            <span>{mb_nick}</span><span></span>
            <span className='comment_date'>{ccmt_date}</span>
            {ccmtLikeCheck ? <button onClick={ccommentLikeOp} className='comment_heart'><FavoriteOutlinedIcon fontSize='15px' /></button>
              : <button onClick={ccommentLike} className='comment_heart'><FavoriteBorderOutlinedIcon fontSize='15px' /></button>}
            <span className='comment_likes'>{ccmtLikeNum} Likes</span>
          </div>
          <div className='comment_blog_p'>
            <span>{ccmt_content}</span>
            <button className="ccomment_button_write" style={memberCheck} onClick={ccmtDelete}>삭제</button>
          </div>
        </div>
        <div>
        </div>
      </div>
    </>
  )
}

export default Ccomment