"use client"

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top : 50px;
`;
const LoginBox1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width : 350px;
  border: 1px solid #DBDBDB;
  height: 350px;
`;
const DivInput1 = styled.div`
  width: 80%;
  height: 7%;
  margin-bottom: 20px;
`
const DivInput2 = styled.div`
  width: 83%;
  height: 9%;
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
  margin: 30px 0;
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

export default function Login() {
  let r = useRouter();
  return (
    <Form onSubmit={(e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let pwd = e.target.pwd.value;

    let jsonMap = JSON.stringify({email, pwd});
      let option = {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : jsonMap //보내줄 값
      }
      
      fetch("/api/login", option)
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        // 서버 응답에 대한 로직 추가
        alert(data.msg);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
   }}>
    <LoginBox1>
      <Logo>home</Logo>
      <DivInput1><InputStyle type="email" name="email" placeholder="이메일 주소"></InputStyle></DivInput1>
      <DivInput1><InputStyle name="pwd" type='password' placeholder="비밀번호"></InputStyle></DivInput1>
      <DivInput2><Submit type="submit" value="로그인"></Submit></DivInput2>
    </LoginBox1>
    <LoginBox>계정이 없으신가요? <Link href='#' onClick={(e) => {
      e.preventDefault();
      r.push("/join")
    }}>가입하기</Link></LoginBox>
   </Form>
  )
}
