"use client"
import React, { useState } from 'react';
import styled from '@emotion/styled';
import MenuBar from '../MenuBar';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form``;

const Input = styled.input`
  display: flex;
  justify-content: center;
  width: 21vw;
  padding: 12px 20px;
  margin: 0 0 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  display: flex;
  justify-content: center;
  width: 21vw;
  height: 100px;
  padding: 12px 20px;
  margin: 0 0 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const InputFile = styled.input`
  display: none;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const LabelImg = styled.label`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
`;

const SocialShare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const SocialIcon = styled.div`
  color: #fff;
  background-color: #3b5998;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: #4c70ba;
  }
`;

const Preview = styled.img`
  width: 20vw;
  height: 25vw;
`;

const ImgBox = styled.div`
  width: 20vw;
  height: 25vw;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  line-height: 25vw;
`;
const InputBox = styled.div`
  display: flex;
  justify-content: center;
`;
export default function PlusSquare(){
  const r = useRouter();
  const [file, setFile] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [croppedImage, setCroppedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onImageLoaded = (image) => {
    setCroppedImage(image);
  };

  const onCropComplete = (crop) => {
    if (croppedImage && crop.width && crop.height) {
      // Implement image cropping logic here
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    formData.append("content", e.target.content.value);
    formData.append("hashTag", e.target.hashTag.value);
    formData.append("userNo", Cookies.get("userNo"));

    let option = {
      method : 'POST',
      body : formData, //보내줄 값
    }

    fetch("api/post/postInsert", option)
    .then(res => {
      if(!res.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return res.json();
    })
    .then(data => {
      alert(data.message);
      r.push("/user");        
    })
    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });
  };

  const handleSocialShare = (platform) => {
    // Implement social sharing logic here
  };
  return(
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <LabelImg htmlFor="file-input"><ImgBox>{file != null ? <Preview src={file}></Preview> : "이미지를 넣어주세요 (클릭)"}</ImgBox></LabelImg>
          <InputFile
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleImageChange}
            name = "image"
            />
            <InputBox><TextArea type="text" id="caption" placeholder="내용" name='content' /></InputBox>
            <InputBox><Input
                     type="text"
                     id="tags"
                     placeholder="태그"
                     name="hashTag"
                   /></InputBox>
            <InputBox><Button type="submit">등록</Button></InputBox>
            </Form>
            <SocialShare>
            <SocialIcon onClick={() => handleSocialShare('facebook')}>
            <FaFacebookF />
            </SocialIcon>
            <SocialIcon onClick={() => handleSocialShare('twitter')}>
            <FaTwitter />
            </SocialIcon>
            <SocialIcon onClick={() => handleSocialShare('instagram')}>
            <FaInstagram />
            </SocialIcon>
            </SocialShare>
            </Container>
            <MenuBar />
            </div>
        );
    };