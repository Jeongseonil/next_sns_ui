"use client"

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top : 100px;
`;
const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
  margin-left: 20px;
`;

const ImageEdit = styled.label`
  margin-top: 10px;
  text-decoration: none;
  color: #0095F6;
  margin-bottom : 20px
`;

const InputStyle = styled.input`
  width: 300px;
  height: 50px;
  border: 0;
  border-bottom: 1px solid #DBDBDB;
  padding: 5px 10px;
  font-size: 15px;
`;

const SubmitStyle = styled.input`
  margin-top: 30px;
  background-color: #fff;
  border: 0;
  font-size: 20px;
  color: #0095F6;
  cursor: pointer;
`;
const InputFile = styled.input`
  display: none;
`

export default function Login() {
  let r = useRouter();
  const [posts, setPosts] = useState([]);
  let [img, setImg] = useState("/profileImage.jpg");
  let param1 = "20";
  useEffect(() => {

    fetch(`/api/user/?param1=${param1}`) // API 라우트를 호출 (api는 고정, 뒤에 폴더 명은 api가 담긴 폴더에 따라 달라 짐)
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
  }, []);
  return (
    <Form onSubmit={e => {
      e.preventDefault();
      let name = e.target.name.value;
      let introduction = e.target.introduction.value;
      let gender = e.target.gender.value;
      let no = param1;
      let file = e.target.file.files[0];

      const formData = new FormData();
      formData.append("name", name);
      formData.append("introduction", introduction);
      formData.append("gender", gender);
      formData.append("no", no);
      formData.append("image", file);

      let option = {
        method : 'POST',
        body : formData //보내줄 값
      }
      
      fetch("/api/user", option)
      .then(res => {
        if(!res.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return res.json();
      })
      .then(data => {
        alert(data.message);        
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
    }}>
      <Avatar src={img}/>
      <ImageEdit>사진 변경
        <InputFile type='file' accept=".gif, .jpg, .png" name="file"></InputFile>
      </ImageEdit>
      <InputStyle placeholder='이름' name='name' defaultValue={posts.USER_NAME}/>
      <InputStyle placeholder='소개' name='introduction' defaultValue={posts.USER_INTRODUCTION}/>
      <InputStyle placeholder='성별' name='gender' defaultValue={posts.USER_GENDER}/>
      <SubmitStyle type='submit' value="수정"/>
    </Form>
  )
}
