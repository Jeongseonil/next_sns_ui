"use client"

import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MenuBar from '../../MenuBar';

const Container = styled.div`

`;

const PostTabs = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px;
  font-size: 18px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${(props) => (props.active ? '#000' : '#ccc')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};

  &:hover {
    color: #000;
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
`;

const LiStyle = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: space-between;
`
const SpanStyle = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 5px;
`

const ButtonStyle = styled.button`
  margin-right: 30px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
`

export default function Home(props) {
  let r = useRouter();
  const [activeTab, setActiveTab] = useState(props.params.type);
  const [followerList, setFollowerList] = useState([]);
  const [followList, setFollowList] = useState([]);
  const [followUser, setFollowUser] = useState("");

  useEffect(()=>{
    let jsonMap = JSON.stringify({userNo : Cookies.get("userNo")});
    let option = {
      method : 'POST',
      headers : {'Content-type' : 'application/json'},
      body : jsonMap //보내줄 값
    }
    fetch(`/api/follow/search`, option) 
    .then((response) => {
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return response.json();
    })
    .then((data) => {
      setFollowerList(data);
    })
    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });

    jsonMap = JSON.stringify({userNo : Cookies.get("userNo")});
    option = {
      method : 'PUT',
      headers : {'Content-type' : 'application/json'},
      body : jsonMap //보내줄 값
    }
    fetch(`/api/follow/search`, option) 
    .then((response) => {
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return response.json();
    })
    .then((data) => {
      setFollowList(data);
      console.log(data);
    })
    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });
  },[followUser])

  function move(userNo){
    if(userNo != Cookies.get("userNo")){
      r.push("/userInfo/"+userNo)
    } else{
      r.push("/user")
    }
  }

  function deleteFollow(followUser){
      let jsonMap = JSON.stringify({userNo:Cookies.get("userNo"), followUser});
      let option = {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : jsonMap //보내줄 값
      }
      fetch("/api/follow/delete", option)
      .then(msg => {setFollowUser(followUser); r.refresh});
  }
  return (
    <Container>
    <PostTabs>
      <Tab
        active={activeTab === 'follower'}
        onClick={() => setActiveTab('follower')}
      >
        팔로워
      </Tab>
      <Tab
        active={activeTab === 'follow'}
        onClick={() => setActiveTab('follow')}
      >
        팔로잉
      </Tab>
    </PostTabs>
    {activeTab === 'follower' && (
    <ul>
      {followerList.map((item) => <LiStyle key={`follower${item.USER_NO}`}><SpanStyle onClick={()=> move(item.USER_NO)}><Avatar src={item.USER_PATH}></Avatar>{item.USER_NAME}가 팔로워 중입니다.</SpanStyle></LiStyle>)}
    </ul>
    )}
    {activeTab === 'follow' && (
      <ul>
        {followList.map((item) => <LiStyle key={`follower${item.FOLLOW_USER_NO}`}><SpanStyle onClick={()=> move(item.FOLLOW_USER_NO)}><Avatar src={item.USER_PATH}></Avatar>{item.USER_NAME}을(를) 팔로잉 중입니다.</SpanStyle><ButtonStyle onClick={() => deleteFollow(item.FOLLOW_USER_NO)}>언팔로우</ButtonStyle></LiStyle>)}
      </ul>
    )}
    <MenuBar />
    </Container>

  )
}
