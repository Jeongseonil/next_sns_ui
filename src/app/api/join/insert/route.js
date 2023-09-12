import { NextResponse } from 'next/server'
import db from '../../../db';

export async function GET() { 
  
}

export async function POST(req) {
  try {
    const requestData = await req.json();
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const hashPassword = async (plainPassword) => {
      try {
        const salt = await bcrypt.genSalt(saltRounds); // 솔트 생성
        const hashedPassword = await bcrypt.hash(plainPassword, salt); // 비밀번호와 솔트를 함께 해싱
        return { hashedPassword, salt }; // 해싱된 비밀번호와 솔트를 반환
      } catch (error) {
        throw error;
      }
    };
    let password = "";
    let { hashedPassword, salt } = await hashPassword(requestData.pwd);
    const results = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO USER (USER_ID, USER_PWD, USER_PWD_SALT, USER_NAME) VALUES('${requestData.email}', '${hashedPassword}', '${salt}', '${requestData.name}')`,
        (err, result) => {
            if (err) {
              console.error('데이터를 가져오는 중 오류 발생:', err);
              reject(err);
            } else {
              console.log('데이터가 성공적으로 삽입되었습니다.');
              resolve(result);
            }
        });
    });
    await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO PROFILE_IMAGE (USER_NO) VALUES('${results.insertId}')`,
        (err, result) => {
            if (err) {
              console.error('데이터를 가져오는 중 오류 발생:', err);
              reject(err);
            } else {
              console.log('데이터가 성공적으로 삽입되었습니다.');
              resolve(result);
            }
        });
    })
    return NextResponse.json({ message: '데이터가 성공적으로 저장되었습니다.' });
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    return NextResponse.error('데이터를 가져올 수 없습니다.', 500);
  }
}