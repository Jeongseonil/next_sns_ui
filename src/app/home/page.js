"use client"
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MenuBar from '../MenuBar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { BsHeart, BsHeartFill, BsBookmarkFill, BsBookmark, BsArrowUpCircle, BsArrowReturnRight } from 'react-icons/bs';  
import { BiCommentDetail, BiLink } from 'react-icons/bi';  
import Modal from 'react-modal';

const Feed = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding: 20px 0;
  margin-bottom: 50px;
`;

const Post = styled.div`
  background-color: white;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #efefef;
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Username = styled.span`
  font-weight: 600;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  margin-right: 15px;
  cursor: pointer;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const ActionButton2 = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const PostContent = styled.div`
  padding: 15px;
  padding-top: 5px;
  margin-bottom: 10px;
`;
const PostCDateTime = styled.div`
  padding: 15px;
  color: #6c6c6c;
  font-size: 12px;
  letter-spacing: -1px;
`

const PostHeart = styled.div`
  padding: 5px 15px;
  font-size: 14px;
  letter-spacing: -2px;
`;
const IconDiv = styled.div`
  display: flex;
`;

const ModalPost = styled.div`
  width: 50%;
  height: 100%;
  border-right: 1px solid #efefef;

`;
const PostModal = styled.div`
background-color: white;
border-radius: 5px;
width: 100%; 
height: 100%;
display: flex;
`;

const ModalComment = styled.div`
width: 50%; 
height: 100%;
position: relative;
`;

const CommentHeader = styled.div`
  font-size: 24px
`
const CommentProfile = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
`;

const CommentUl = styled.ul`
  list-style: none;
  padding-left: 10px;
  height: 605px;
  overflow: auto;
`;

const Commentli = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 12px;
`;

const CommentliDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentTime = styled.span`
  font-size: 12px;
  letter-spacing: -1px;
  width: 104px;

`
const CommentName = styled.span`
  font-size: 14px;
  font-weight: bold;
`
const CommentContent = styled.span`
  font-size: 14px;
  font-weight: normal;
`
const CommentForm = styled.form`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
}
`;
const CommenInput = styled.input`
  border-radius: 30px;
  border: 1px solid #757575;
  width: 415px;
  height: 10px;
  padding: 10px;
  padding-right: 36px;
`;

const CommenInput2 = styled.input`
  border-radius: 30px;
  border: 1px solid #757575;
  width: 310px;
  height: 10px;
  padding: 10px;
  padding-right: 36px;
`;

const ReplyForm = styled.form`
  display: flex;
  align-items: center;
  margin-top: 10px;
`
const IconSpan = styled.span`
  font-size: 18px;
  color: #888;
`

const CommentSubmit = styled.button`
  margin-left: -36px;
  font-size: 24px;
  background: 0;
  border: 0;
  display: flex;
  align-items: center;
}
`;

const CommentDelete  = styled.a`
  font-size: 12px;
  margin-left: 10px;
  text-decoration: none;
  color: #000;
`;

const CommentReply = styled.a`
  font-size: 12px;
  margin-left: 10px;
  text-decoration: none;
  color: #000;
`;

const Replyli = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 10px;
`;

const ReplyUl = styled.ul`
  margin : 0px;
  padding : 0px;
`

export default function Home(){
  let r = useRouter();
  const [heartList, setHeartList] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [commentList, setCommentList] = useState([{}]);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyList, setReplyList] = useState([]);

  const handleReplyClick = (id) => {
    setActiveReplyId(id);
  };

  const handleOpenModal = (content) => { //모달 오픈시 댓글 데이터 불러오기
    searchReply(content);
    searchComment(content);
    setModalContent(content);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function searchReply(content){
    fetch(`api/home/reply/?param1=${content.POST_NO}`)
    .then(res => {
      if(!res.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return res.json();
    })
    .then(data => {
      setReplyList(data);
    })
    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });
  }

  function searchComment(content){
    fetch(`api/home/comment/?param1=${content.POST_NO}`)
    .then(res => {
      if(!res.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return res.json();
    })
    .then(data => {
      setCommentList(data);
    })
    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });
  }

  // Replace this function with a real API call

  function searchHeartList(){  //하트 리스트
    fetch(`api/home/heartList/?param1=${Cookies.get("userNo")}`)
    .then(res => {
      if(!res.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return res.json();
    })
    .then(data => {
      let newArr = [];
      newArr = data.map((itme) => itme.POST_NO);
      setHeartList(newArr);
    })
    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });
  };

  function searchBookList(){  //북마크 검색
    fetch(`api/home/bookList/?param1=${Cookies.get("userNo")}`)
    .then(res => {
      if(!res.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return res.json();
    })
    .then(data => {
      let newArr = [];
      newArr = data.map((itme) => itme.POST_NO);
      setBookList(newArr);
    })
    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });
  }

  function searchPostList(){  //글목록 검색
    fetch("api/home/list")
    .then(res => {
      if(!res.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return res.json();
    })
    .then(data => {
      setPosts(data);       
    })
    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });
  }

  function insertHeart(postNo){ //하트 추가
    let jsonMap = JSON.stringify({postNo, userNo : Cookies.get("userNo")});
    let option = {
      method : 'POST',
      headers : {'Content-type' : 'application/json'},
      body : jsonMap //보내줄 값
    }
    fetch("api/home/heart", option)
    .then((response) => {
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return response.json();
    })
    .then((data) => {
      searchPostList();   
      searchHeartList();
      r.refresh();
    })
    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });
  }

  function deleteHeart(postNo){ //하트 제거
    let jsonMap = JSON.stringify({postNo, userNo : Cookies.get("userNo")});
    let option = {
      method : 'PUT',
      headers : {'Content-type' : 'application/json'},
      body : jsonMap //보내줄 값
    }
    fetch("api/home/heart", option)
    .then((response) => {
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return response.json();
    })
    .then((data) => {
      searchPostList();
      searchHeartList();
      r.refresh();
    })
    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });
  }

  function insertBook(postNo){ //북마크 추가
    let jsonMap = JSON.stringify({postNo, userNo : Cookies.get("userNo")});
    let option = {
      method : 'POST',
      headers : {'Content-type' : 'application/json'},
      body : jsonMap //보내줄 값
    }
    fetch("api/home/bookMark", option)
    .then((response) => {
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return response.json();
    })
    .then((data) => {
      searchBookList();
      r.refresh();
    })
    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });
  }

  function deleteBook(postNo){ //북마크 제거
    let jsonMap = JSON.stringify({postNo, userNo : Cookies.get("userNo")});
    let option = {
      method : 'PUT',
      headers : {'Content-type' : 'application/json'},
      body : jsonMap //보내줄 값
    }
    fetch("api/home/bookMark", option)
    .then((response) => {
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return response.json();
    })
    .then((data) => {
      searchBookList();
      r.refresh();
    })
    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });
  }

  useEffect(() => {
    if(Cookies.get("userNo") == undefined){
      r.push("/login");
    }
    searchPostList();
    searchHeartList();
    searchBookList();
  }, []);

  const heartClick = (postNo) => {
    if(heartList.includes(postNo)){
      deleteHeart(postNo)
    } else {
      insertHeart(postNo)
    }
  };

  const bookClick = (postNo) => {
    if(bookList.includes(postNo)){
      deleteBook(postNo)
    } else {
      insertBook(postNo)
    }
  }

  return (
    <div>
      <Feed>
        {posts.map((post) => (
          <Post key={post.POST_NO}>
            <PostHeader>
              <User>
                <Avatar src={post.USER_PATH} alt={post.USERNAME} />
                <Username>{post.USER_NAME}</Username>
              </User>
            </PostHeader>
            <PostImage src={post.POST_PATH} alt="Post" />
            <PostActions>
              <IconDiv>
                <ActionButton onClick={() => heartClick(post.POST_NO)}>{heartList.includes(post.POST_NO) ? <BsHeartFill/> : <BsHeart/>}</ActionButton>
                <ActionButton onClick={() => handleOpenModal(post)}><BiCommentDetail/></ActionButton>
                <ActionButton><BiLink/></ActionButton>
              </IconDiv>
              <ActionButton2 onClick={() => bookClick(post.POST_NO)}>{bookList.includes(post.POST_NO) ? <BsBookmarkFill/> : <BsBookmark/>}</ActionButton2>
            </PostActions>
            {post.HEART_CNT >0 ? <PostHeart>좋아요 {post.HEART_CNT}개</PostHeart> : ""}
            <PostContent>{post.POST_CONTENT}</PostContent>
            <PostCDateTime>{post.CDATETIME}</PostCDateTime>
          </Post>
        ))}
      </Feed>
      {modalContent && (
        <Modal ariaHideApp={false} isOpen={isModalOpen} onRequestClose={handleCloseModal} style={{
            content: {
              color: 'black',
              width: '1000px',
              height: '744px',
              margin: 'auto',
              border: 0,
              background: 0
            },
            overlay: {
              backgroundColor: 'rgba(0,0,0,0.5)',
            }
          }}>
          <PostModal>
            <ModalPost>
              <PostHeader>
                <User>
                  <Avatar src={modalContent.USER_PATH} alt={modalContent.USERNAME} />
                  <Username>{modalContent.USER_NAME}</Username>
                </User>
              </PostHeader>
              <PostImage src={modalContent.POST_PATH} alt="Post" />
              <PostActions>
                <IconDiv>
                  <ActionButton onClick={() => heartClick(modalContent.POST_NO)}>{heartList.includes(modalContent.POST_NO) ? <BsHeartFill/> : <BsHeart/>}</ActionButton>
                  <ActionButton><BiLink/></ActionButton>
                </IconDiv>
                <ActionButton2 onClick={() => bookClick(modalContent.POST_NO)}>{bookList.includes(modalContent.POST_NO) ? <BsBookmarkFill/> : <BsBookmark/>}</ActionButton2>
              </PostActions>
              {modalContent.HEART_CNT >0 ? <PostHeart>좋아요 {modalContent.HEART_CNT}개</PostHeart> : ""}
              <PostContent>{modalContent.POST_CONTENT}</PostContent>
            </ModalPost>
            <ModalComment>
              <PostHeader>
                <CommentHeader>댓글</CommentHeader>
              </PostHeader>
              <CommentUl>
                {commentList.map((item) => (
                    <Commentli key={`comment${item.COMMENT_NO}`}>
                        <CommentProfile src={item.USER_PATH}/>
                        <CommentliDiv>
                          <CommentName>{item.USER_NAME} <CommentContent>{item.COMMENT_CONTENT}</CommentContent></CommentName>
                          <div>
                            <CommentTime>{item.CDATETIME}</CommentTime>
                            <CommentReply href='#' onClick={e => {
                              e.preventDefault();
                              handleReplyClick(item.COMMENT_NO);
                            }}>{"답글 달기"}</CommentReply>
                            <CommentDelete href='#' onClick={(e) => deleteComment(e, item, modalContent)}>{item.USER_NO == Cookies.get("userNo") ? "삭제" : ""}</CommentDelete>
                          </div>
                          {activeReplyId === item.COMMENT_NO && (
                            <ReplyForm onSubmit={e => insertReply(e, item, modalContent)}>
                              <IconSpan><BsArrowReturnRight/></IconSpan><CommenInput2 name='reply' placeholder='답글 달기...'/><CommentSubmit type='submit'><BsArrowUpCircle/></CommentSubmit>
                            </ReplyForm>
                          )}
                            <ReplyUl>
                            {replyList.filter(reply => reply.COMMENT_NO === item.COMMENT_NO).map(reply => (
                              <Replyli key={`reply${reply.REPLY_NO}`}>
                                <CommentProfile src={reply.USER_PATH}/>
                                <CommentliDiv>
                                  <CommentName>{reply.USER_NAME} <CommentContent>{reply.REPLY_CONTENT}</CommentContent></CommentName>
                                  <div>
                                  <CommentTime>{reply.CDATETIME}</CommentTime>
                                  <CommentDelete href='#' onClick={(e) => deleteReply(e, reply, modalContent)}>{reply.USER_NO == Cookies.get("userNo") ? "삭제" : ""}</CommentDelete>
                                  </div>
                                </CommentliDiv>
                              </Replyli>
                            ))}
                            </ReplyUl>
                        </CommentliDiv>
                    </Commentli>
                  ))}
            </CommentUl>
            <CommentForm onSubmit={e => insertComment(e, modalContent)}>
              <CommenInput name='comment' placeholder='댓글 달기...'/><CommentSubmit type='submit'><BsArrowUpCircle/></CommentSubmit>
            </CommentForm>
            </ModalComment>
          </PostModal> 
        </Modal>
      )}
      <MenuBar />
    </div>
  )

  function deleteComment(e, item, modalContent) { // 댓글 삭제
    e.preventDefault();
    if(!window.confirm("정말삭제하시겠습니까?")){
      return;
    }
    let jsonMap = JSON.stringify({commentNo : item.COMMENT_NO});
    let option = {
      method : 'PUT',
      headers : {'Content-type' : 'application/json'},
      body : jsonMap //보내줄 값
    }
    fetch("api/home/comment", option)
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        handleOpenModal(modalContent);
        r.refresh();
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
  }

  function deleteReply(e, reply, modalContent) { // 댓글 삭제
    e.preventDefault();
    if(!window.confirm("정말삭제하시겠습니까?")){
      return;
    }
    let jsonMap = JSON.stringify({replyNo : reply.REPLY_NO});
    let option = {
      method : 'PUT',
      headers : {'Content-type' : 'application/json'},
      body : jsonMap //보내줄 값
    }
    fetch("api/home/reply", option)
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        handleOpenModal(modalContent);
        r.refresh();
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
  }

  function insertReply(e, item, modalContent) {    //답급 작성
    e.preventDefault();
    let reply = e.target.reply.value;
    let commentNo = item.COMMENT_NO;
    let userNo = Cookies.get("userNo");
    let jsonMap = JSON.stringify({reply, commentNo, userNo});
    let option = {
      method : 'POST',
      headers : {'Content-type' : 'application/json'},
      body : jsonMap //보내줄 값
    }
    fetch("api/home/reply", option)
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        handleOpenModal(modalContent);
        e.target.reply.value = "";
        handleReplyClick(null);
        r.refresh();
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
  }

  function insertComment(e, modalContent){  //댓글 작성
    e.preventDefault();
    let comment = e.target.comment.value;
    let postNo = modalContent.POST_NO;
    let userNo = Cookies.get("userNo");
    let jsonMap = JSON.stringify({comment, postNo, userNo});
    let option = {
      method : 'POST',
      headers : {'Content-type' : 'application/json'},
      body : jsonMap //보내줄 값
    }
    fetch("api/home/comment", option)
    .then((response) => {
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return response.json();
    })
    .then((data) => {
      handleOpenModal(modalContent);
      e.target.comment.value = "";
      r.refresh();
    })
    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });
  }
}