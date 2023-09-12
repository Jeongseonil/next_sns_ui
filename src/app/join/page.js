"use client"

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top : 50px;
`;
const JoinBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width : 350px;
  border: 1px solid #DBDBDB;
  height: 450px;
`;
const DivInput1 = styled.div`
  width: 80%;
  height: 7%;
  margin-bottom: 20px;
`
const DivInput2 = styled.div`
  width: 83%;
  height: 8%;
  margin-top: 10px;
  margin-left: 12px;
`
const InputStyle = styled.input`
  width : 100%;
  height: 100%;
  background-color: #FAFAFA;
  border: 1px solid #DBDBDB;
  border-radius: 3px;
  padding: 5px;
`
const Submit = styled.input`
  width : 100%;
  height: 100%;
  border-radius: 8px;
  border: 0px;
  background-color: #0095F6;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  padding: 5px;
`
const Logo = styled.div`
  margin-top: 30px;
  @font-face {
    font-family: 'iceJaram-Rg';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/iceJaram-Rg.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  font-family : 'iceJaram-Rg';
  font-size: 80px;
  cursor: pointer;
`
const LoginBox = styled.div`
  margin-top: 10px;
  border: 1px solid #DBDBDB;
  width : 350px;
  height: 70px;
  text-align: center;
  line-height: 70px;
`

const Link = styled.a`
  text-decoration: none; 
  color: #0095F6 ;
  font-weight: bold;
`
const Msg = styled.div`
  margin-bottom: 30px;
  color: #737373;
  font-weight: bold;
`

export default function Join() {
  let r = useRouter();

  //아이디 중복 및 정규식
  const handleEmailChange = async (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
    if (!emailRegex.test(email)) {
      alert("이메일은 영어, 숫자, 밑줄(_), 마침표(.), 퍼센트(%), 더하기(+), 하이픈(-) 으로 작성해주세요");
      return false; // 유효하지 않은 이메일 주소일 경우 false 반환
    }
  
    try {
      const response = await fetch(`api/join/idCheck/?email=${email}`);
      
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
  
      const data = await response.json();
  
      if (data.CNT === 1) {
        alert("이메일이 중복입니다.");
        return false; // 중복된 이메일 주소일 경우 false 반환
      }
  
      // 이메일 주소가 유효하고 중복되지 않은 경우
      return true;
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
      return false; // 오류가 발생한 경우 false 반환
    }
  };

  return (
    <Form onSubmit={async(e) => {
      e.preventDefault();
      let email = e.target.email.value;
      let pwd = e.target.pwd.value;
      let name = e.target.name.value;

      let check = await handleEmailChange(email);
      if(!check){
        return;
      }

      if(pwd == undefined || pwd ==""){
        alert("비밀번호를 입력해주세요")
        return;
      }
      if(name == undefined || name ==""){
        alert("이름을 입력해주세요")
        return;
      }
      let jsonMap = JSON.stringify({email, pwd, name});
      let option = {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : jsonMap //보내줄 값
      }
      
      fetch("/api/join/insert", option)
        .then(msg => {alert("가입을 환영합니다"); r.push("/login")});
   }}>
    <JoinBox>
      <Logo>home</Logo>
      <Msg>친구와 추억을 공유하려면 가입하세요</Msg>
      <DivInput1><InputStyle name="email" placeholder="이메일 주소"></InputStyle></DivInput1>
      <DivInput1><InputStyle name="pwd" type='password' placeholder="비밀번호"></InputStyle></DivInput1>
      <DivInput1><InputStyle name="name" placeholder="성명"></InputStyle></DivInput1>
      <DivInput2><Submit type="submit" value="가입"></Submit></DivInput2>
    </JoinBox>
    <LoginBox>계정이 있으신가요? <Link href='#' onClick={(e) => {
      e.preventDefault();
      r.push("/login")
    }}>로그인</Link></LoginBox>
   </Form>
  )
}
