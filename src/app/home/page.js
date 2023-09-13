"use client"
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MenuBar from '../MenuBar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { BsHeart, BsHeartFill } from 'react-icons/bs';  
import { BiCommentDetail, BiLink } from 'react-icons/bi';  

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

const PostContent = styled.div`
  padding: 15px;
  padding-top: 5px;
  margin-bottom: 10px;
`;

const PostHeart = styled.div`
  padding: 5px 15px;
  font-size: 14px;
  letter-spacing: -2px;
`

export default function Home(){
  let r = useRouter();
  const [heartList, setHeartList] = useState([]);
  const [posts, setPosts] = useState([]);
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
      searchHeartList();
      searchPostList();
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
      searchHeartList();
      searchPostList();
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
  }, []);

  const heartClick = (postNo) => {
    if(heartList.includes(postNo)){
      deleteHeart(postNo)
    } else {
      insertHeart(postNo)
    }
    

  };

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
              <ActionButton onClick={() => heartClick(post.POST_NO)}>{heartList.includes(post.POST_NO) ? <BsHeartFill/> : <BsHeart/>}</ActionButton>
              <ActionButton><BiCommentDetail/></ActionButton>
              <ActionButton><BiLink/></ActionButton>
            </PostActions>
            {post.HEART_CNT >0 ? <PostHeart>좋아요 {post.HEART_CNT}개</PostHeart> : ""}
            <PostContent>{post.POST_CONTENT}</PostContent>
          </Post>
        ))}
      </Feed>
      <MenuBar />
    </div>
  )
}