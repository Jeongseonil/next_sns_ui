"use client"
import React, { useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import { BsHeart, BsHeartFill, BsBookmarkFill, BsBookmark, BsArrowUpCircle, BsArrowReturnRight } from 'react-icons/bs';  
import { BiLink } from 'react-icons/bi';  
import Modal from 'react-modal';
import { useRouter } from 'next/navigation';

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
  cursor: pointer;
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
  cursor: pointer;
`
const CommentContent = styled.span`
  font-size: 14px;
  font-weight: normal;
  cursor: auto;
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
  cursor: pointer;
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

const PostHeart = styled.div`
  padding: 5px 15px;
  font-size: 14px;
  letter-spacing: -2px;
`;
const IconDiv = styled.div`
  display: flex;
`;

const ModalComponent = ({ isModalOpen, handleCloseModal, modalContent}) => {
    let r = useRouter();
    const [activeReplyId, setActiveReplyId] = useState(null);
    const [commentList, setCommentList] = useState([{}]);
    const [heartList, setHeartList] = useState([]);
    const [bookList, setBookList] = useState([]);
    const [replyList, setReplyList] = useState([]);
    const [post, setPost] = useState([]);

    useEffect(() => {
        searchReply(modalContent);
        searchComment(modalContent);
        selectPostInfo(modalContent);
        searchHeartList();
        searchBookList();
    },[modalContent])

    function selectPostInfo(modalContent){
      fetch(`/api/post/postInsert/?param1=${modalContent.POST_NO}`, {cache : 'no-store'}) 
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
    }

    function refresh(){
        searchReply(modalContent);
        searchComment(modalContent);
    }

    const handleReplyClick = (id) => {
        setActiveReplyId(id);
      };

    function searchReply(modalContent){
        fetch(`api/home/reply/?param1=${modalContent.POST_NO}`)
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

    function searchComment(modalContent){
        fetch(`api/home/comment/?param1=${modalContent.POST_NO}`)
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

    const moveUser = (no) => {
      if(no != Cookies.get("userNo")){
        r.push("/userInfo/"+no)
      } else{
        r.push("/user")
      }
    }
  return (
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
            <User onClick={() => {moveUser(post.USER_NO)}}>
            <Avatar src={post.USER_PATH} alt={post.USERNAME} />
            <Username>{post.USER_NAME}</Username>
            </User>
        </PostHeader>
        <PostImage src={post.POST_PATH} alt="Post" />
        <PostActions>
            <IconDiv>
            <ActionButton onClick={() => heartClick(post.POST_NO)}>{heartList.includes(post.POST_NO) ? <BsHeartFill/> : <BsHeart/>}</ActionButton>
            <ActionButton><BiLink/></ActionButton>
            </IconDiv>
            <ActionButton2 onClick={() => bookClick(post.POST_NO)}>{bookList.includes(post.POST_NO) ? <BsBookmarkFill/> : <BsBookmark/>}</ActionButton2>
        </PostActions>
        {post.HEART_CNT >0 ? <PostHeart>좋아요 {post.HEART_CNT}개</PostHeart> : ""}
        <PostContent>{post.POST_CONTENT}</PostContent>
        </ModalPost>
        <ModalComment>
        <PostHeader>
            <CommentHeader>댓글</CommentHeader>
        </PostHeader>
        <CommentUl>
            {commentList.map((item) => (
                <Commentli key={`comment${item.COMMENT_NO}`}>
                    <CommentProfile src={item.USER_PATH} onClick={() => {moveUser(item.USER_NO)}}/>
                    <CommentliDiv>
                    <CommentName onClick={() => {moveUser(item.USER_NO)}}>{item.USER_NAME} <CommentContent>{item.COMMENT_CONTENT}</CommentContent></CommentName>
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
                            <CommentProfile src={reply.USER_PATH} onClick={() => {moveUser(reply.USER_NO)}}/>
                            <CommentliDiv>
                            <CommentName onClick={() => {moveUser(reply.USER_NO)}}>{reply.USER_NAME} <CommentContent>{reply.REPLY_CONTENT}</CommentContent></CommentName>
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
  );

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
        refresh(modalContent);
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
        refresh(modalContent);
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
        refresh(modalContent);
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
      refresh(modalContent);
      e.target.comment.value = "";
      r.refresh();
    })
    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });
  }

};

export default ModalComponent;