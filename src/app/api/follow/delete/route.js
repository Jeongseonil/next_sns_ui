import { NextResponse } from 'next/server'
import db from '../../../db';

export async function GET() { 
  
}

export async function POST(req) {
  try {
    const requestData = await req.json();
  
    const results = await new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM FOLLOW WHERE USER_NO = '${requestData.userNo}' AND FOLLOW_USER_NO = '${requestData.followUser}'`,
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

    return NextResponse.json({ message: '데이터가 성공적으로 저장되었습니다.' });
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    return NextResponse.error('데이터를 가져올 수 없습니다.', 500);
  }
}