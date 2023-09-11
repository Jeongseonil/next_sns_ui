"use client"
import React from 'react';
import styled from '@emotion/styled';
import { FiHome, FiSearch, FiPlusSquare, FiHeart, FiUser } from 'react-icons/fi';

const MenuBarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  height: 60px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
`;

const MenuIcon = styled.div`
  font-size: 24px;
  color: #555;
`;

const MenuBar = () => {
  return (
    <MenuBarContainer>
      <a href='/home'>
        <MenuIcon>
            <FiHome />
        </MenuIcon>
      </a>
      <a href='/search'>
      <MenuIcon>
        <FiSearch />
      </MenuIcon>
      </a>
      <a href='/plusSquare'>
      <MenuIcon>
        <FiPlusSquare />
      </MenuIcon>
      </a>
      <a href='/heart'>
      <MenuIcon>
        <FiHeart />
      </MenuIcon>
      </a>
      <a href='/user'>
      <MenuIcon>
        <FiUser />
      </MenuIcon>
      </a>
    </MenuBarContainer>
  );
};

export default MenuBar;