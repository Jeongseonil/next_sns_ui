import { NextResponse } from 'next/server'
import db from '../../db';

export async function GET(req) { 
  try {
    const results = await new Promise((resolve, reject) => {
      const { searchParams } = new URL(req.url)
      const param1 = searchParams.get('param1')
      console.log(param1);
      db.query(
        `SELECT U.USER_NAME, P.U_IMG_PATH, P.U_IMG_NAME, COUNT(P2.POST_NO) AS POST_CNT, COUNT(F.FOLLOW_NO) AS FOLLOWER_CNT, COUNT(F2.FOLLOW_NO) AS FOLLOW_CNT
        FROM USER U
        INNER JOIN PROFILE_IMAGE P ON U.USER_NO = P.USER_NO
        LEFT JOIN POST P2 ON U.USER_NO = P2.USER_NO
        LEFT JOIN FOLLOW F ON U.USER_NO = F.FOLLOW_USER_NO
        LEFT JOIN FOLLOW F2 ON U.USER_NO = F2.USER_NO
        WHERE U.USER_NO = ${param1}
        GROUP BY U.USER_NAME, P.U_IMG_PATH, P.U_IMG_NAME;`,
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