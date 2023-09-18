"use client"
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import MenuBar from '../MenuBar';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import ModalComponent from '../ModalComponent';

const Container = styled.div`
  padding: 20px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  margin-left: 20px;
`;

const UserInfo = styled.div``;

const Username = styled.h2`
  margin: 0;
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const Bio = styled.p`
  margin: 0 0 10px 0;
  padding-left: 10px;
`;

const Stats = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StatItem = styled.li`
  margin-right: 20px;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
`;

const StatValue = styled.strong`
  display: block;
  text-align: center;
`;

const StatLabel = styled.span``;

const EditProfileButton = styled.button`
  background-color: #ffffff;
  border: solid 1px #DBDBDB;
  color: black;
  padding: 5px;
  text-align: center;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 10px;
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

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 50px;  
`;

const Post = styled.img`
  width: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const NameEditBox = styled.div`
  display: flex;
`

export default function User(){
  let r = useRouter();
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [list, setList] = useState([]);
  const [bookList, setBookList] = useState([]);
  let [img, setImg] = useState("/profileImage.jpg");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isLoding, setIsLoding] = useState(true);

  const handleOpenModal = (content) => { //모달 오픈시 댓글 데이터 불러오기
    setModalContent(content);
    setIsModalOpen(true);
  };
  
  useEffect(() => {
    var param1 = Cookies.get("userNo");
    fetch(`/api/user/info/?param1=${param1}`) // API 라우트를 호출 (api는 고정, 뒤에 폴더 명은 api가 담긴 폴더에 따라 달라 짐)
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        setImg(`${data.U_IMG_PATH}${data.U_IMG_NAME}`);
        setPosts(data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });

      fetch(`/api/user/post/?param1=${param1}`) 
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        setList(data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });

      fetch(`/api/user/bookMark/?param1=${param1}`) 
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        setBookList(data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
      setIsLoding(false);
  }, []);
  const handleEditProfile = () => {
    r.push("/editProfile");
  };
  return (
    <div>
      <Container>
        <ProfileHeader>
          <Avatar src={img} />
          <UserInfo>
            <NameEditBox>
              <Username>{posts.USER_NAME}</Username>
              <EditProfileButton onClick={handleEditProfile}>
                프로필 수정
              </EditProfileButton>
              <EditProfileButton onClick={()=>{Cookies.remove('userNo'); r.push("/login")}}>로그아웃</EditProfileButton>
            </NameEditBox>
            <Bio>{posts.USER_INTRODUCTION}</Bio>
            <Stats>
              <StatItem>
                <StatValue>{posts.POST_CNT}</StatValue>
                <StatLabel>게시글</StatLabel>
              </StatItem>
              <StatItem onClick={() => r.push("/follow/follower")}>
                <StatValue>{posts.FOLLOWER_CNT}</StatValue>
                <StatLabel>팔로워</StatLabel>
              </StatItem>
              <StatItem onClick={() => r.push("/follow/follow")}>
                <StatValue>{posts.FOLLOW_CNT}</StatValue>
                <StatLabel>팔로잉</StatLabel>
              </StatItem>
            </Stats>
          </UserInfo>
        </ProfileHeader>
        <PostTabs>
      <Tab
        active={activeTab === 'posts'}
        onClick={() => setActiveTab('posts')}
      >
        게시글
      </Tab>
      <Tab
        active={activeTab === 'saved'}
        onClick={() => setActiveTab('saved')}
      >
        북마크
      </Tab>
    </PostTabs>
    {activeTab === 'posts' && (
      <Posts>
        {list.map((item) => <Post src={item.PATH} key={item.POST_NO} onClick={()=> handleOpenModal({POST_NO : item.POST_NO})}></Post>)}
      </Posts>
    )}
    {isLoding && (
      <h1 style={{textAlign: "center"}}>로딩중...</h1>
    )}
    {activeTab === 'saved' && (
      <Posts>
        {bookList.map((item) => <Post src={item.PATH} key={item.POST_NO} onClick={()=> handleOpenModal({POST_NO : item.POST_NO})}></Post>)}  
      </Posts>
    )}
  </Container>
  {modalContent && (
        <ModalComponent 
          isModalOpen={isModalOpen} //
          handleCloseModal={() => {
            setIsModalOpen(false);
          }}
          modalContent={modalContent} // post_no만 보내도댐
        />
  )}
  <MenuBar />
</div>
  )
}