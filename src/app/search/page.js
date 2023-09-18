"use client"
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MenuBar from '../MenuBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import ModalComponent from '../ModalComponent';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
const Container = styled.div`

`;

const SearchBar = styled.input`
  display: block;
  width: 100%;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 4px;
`;

const GridItem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
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

const User = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Username = styled.span`
  font-weight: 600;
`;

export default function Search(){
  const [images, setImages] = useState([]);
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("post");

  let r = useRouter();

  const handleOpenModal = (content) => { //모달 오픈시 댓글 데이터 불러오기
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Replace this function with a real API call
  const fetchImages = async () => {
    const newImages = [

    ];

    setImages((prevImages) => [...prevImages, ...newImages]);

    // Set 'hasMore' to false when there are no more images to load
    // setHasMore(false);
  };

  const handleSearch = (event) => {
    let param1 = event.target.value
    if(param1 == ""){
      return;
    }
    fetch(`/api/search/?param1=${param1}`) // API 라우트를 호출 (api는 고정, 뒤에 폴더 명은 api가 담긴 폴더에 따라 달라 짐)
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        setImages(data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });

      fetch(`/api/search/user/?param1=${param1}`) // API 라우트를 호출 (api는 고정, 뒤에 폴더 명은 api가 담긴 폴더에 따라 달라 짐)
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <Container>
          <SearchBar
            type="text"
            placeholder="검색"
            onChange={handleSearch}
          />
          <PostTabs>
            <Tab
              active={activeTab === 'post'}
              onClick={() => setActiveTab('post')}
            >
              게시글
            </Tab>
            <Tab
              active={activeTab === 'user'}
              onClick={() => setActiveTab('user')}
            >
              사용자
            </Tab>
          </PostTabs>
          {activeTab === 'post' && (
            <InfiniteScroll
            dataLength={images.length}
            next={fetchImages}
            hasMore={hasMore}
          >
            <Grid>
              {images.map((image, index) => (
                <GridItem key={index} src={image.POST_PATH} alt="Thumbnail" onClick={()=> handleOpenModal({POST_NO : image.POST_NO})}/>
              ))}
            </Grid>
          </InfiniteScroll>
          )}
          {activeTab === 'user' && (
            <InfiniteScroll
            dataLength={users.length}
            next={fetchImages}
            hasMore={hasMore}
            >
              <Grid>
              {users.map((user, index) => (
                <User key={index} onClick={() => {
                if(user.USER_NO != Cookies.get("userNo")){
                  r.push("/userInfo/"+user.USER_NO)
                } else{
                  r.push("/user")
                }
                }}>
                  <Avatar src={user.USER_PATH} alt={user.USERNAME} />
                  <Username>{user.USER_NAME}</Username>
                </User>
              ))}
              </Grid>
            </InfiniteScroll>
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