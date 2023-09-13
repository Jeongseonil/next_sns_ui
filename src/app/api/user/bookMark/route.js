import { NextResponse } from 'next/server'
import db from '../../../db';


export async function GET(req) { 
  try {
    const results = await new Promise((resolve, reject) => {
      const { searchParams } = new URL(req.url)
      const param1 = searchParams.get('param1')
      db.query(
        `SELECT b.POST_NO, CONCAT(i.U_IMG_PATH, i.U_IMG_NAME) AS PATH 
        FROM bookmark b
        INNER JOIN post_image i
          ON b.POST_NO = i.POST_NO
        WHERE b.USER_NO = ${param1}
        ORDER BY b.CDATETIME DESC`,
        (err, results) => {
            if (err) {
            console.error('데이터를 가져오는 중 오류 발생:', err);
            reject(err);
            } else {
            console.log('data ==> ', results);
            resolve(results);
            }
        });
    });
    return NextResponse.json(results);
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    return NextResponse.error('데이터를 가져올 수 없습니다.', 500);
  }
}
