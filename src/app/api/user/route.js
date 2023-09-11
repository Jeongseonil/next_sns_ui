import { NextResponse } from 'next/server'
import db from '../../db';

export async function GET(req) { 
  try {
    const results = await new Promise((resolve, reject) => {
      const { searchParams } = new URL(req.url)
      const param1 = searchParams.get('param1')
      console.log(param1);
      db.query(
        `SELECT USER_NAME, P.U_IMG_PATH, P.U_IMG_NAME
        FROM USER U
        INNER JOIN PROFILE_IMAGE P
            ON U.USER_NO = P.USER_NO
        WHERE U.USER_NO = ${param1}`,
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

export async function POST() {
  // 기능 작성
}