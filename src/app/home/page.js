"use client"
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MenuBar from '../MenuBar';

const Feed = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding: 20px 0;
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
  border-bottom: 1px solid #efefef;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  margin-right: 15px;
  cursor: pointer;
`;


export default function Home(){

  const [posts, setPosts] = useState([]);

  // Replace this function with a real API call
  useEffect(() => {
    // Fetch posts from API here
    const fetchPosts = async () => {
      const dummyPosts = [
        {
          id: 1,
          user: {
            username: 'user1',
            avatar: 'https://via.placeholder.com/32',
          },
          imageUrl: 'https://i.namu.wiki/i/R0AhIJhNi8fkU2Al72pglkrT8QenAaCJd1as-d_iY6MC8nub1iI5VzIqzJlLa-1uzZm--TkB-KHFiT-P-t7bEg.webp',
        },
        {
          id: 2,
          user: {
            username: 'user2',
            avatar: 'https://via.placeholder.com/32',
          },
          imageUrl: 'https://health.chosun.com/site/data/img_dir/2023/04/04/2023040401590_0.jpg',
        },
        {
          id: 3,
          user: {
            username: 'user3',
            avatar: 'https://via.placeholder.com/32',
          },
          imageUrl: 'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG',
        },
        
      ];

      setPosts(dummyPosts);
    };

    fetchPosts();
  }, []);
  return (
    <div>
      <Feed>
        {posts.map((post) => (
          <Post key={post.id}>
            <PostHeader>
              <User>
                <Avatar src={post.user.avatar} alt={post.user.username} />
                <Username>{post.user.username}</Username>
              </User>
            </PostHeader>
            <PostImage src={post.imageUrl} alt="Post" />
            <PostActions>
              <ActionButton>❤️</ActionButton>
              <ActionButton>💬</ActionButton>
              <ActionButton>🔗</ActionButton>
            </PostActions>
          </Post>
        ))}
      </Feed>
      <MenuBar />
    </div>
  )
}