import { NextResponse } from 'next/server'
import db from '../../db';

export async function GET(req) { 
  try {
    const results = await new Promise((resolve, reject) => {
      const { searchParams } = new URL(req.url)
      const param1 = searchParams.get('param1')
      db.query(
          `SELECT COUNT(*) AS CNT
          FROM USER
          WHERE USER_ID = '${param1}';`,
        (err, results) => {
            if (err) {
            console.error('데이터를 가져오는 중 오류 발생:', err);
            reject(err);
            } else {
            console.log('data ==> ', results);
            resolve(results[0]);
            }
        });
    });
    return NextResponse.json(results);
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    return NextResponse.error('데이터를 가져올 수 없습니다.', 500);
  }
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
    let { hashedPassword, salt } = await hashPassword(requestData.password);
    const results = await new Promise((resolve, reject) => {
      db.query(
        `UPDATE USER SET USER_PWD = ?, USER_PWD_SALT = ? WHERE USER_ID = ?`, [hashedPassword, salt, requestData.email],
        (err, result) => {
            if (err) {
              console.error('데이터를 가져오는 중 오류 발생:', err);
              reject(err);
            } else {
              console.log('데이터가 성공적으로 업데이트되었습니다.');
              resolve(result);
            }
        });
    });
    return NextResponse.json({ message: '비밀번호가 변경되었습니다.' });
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    return NextResponse.error('데이터를 가져올 수 없습니다.', 500);
  }
}