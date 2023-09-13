import { NextResponse } from 'next/server'
import db from '../../../db';


export async function GET() { 
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT p.POST_NO, p.POST_CONTENT, p.POST_HASHTAG, u.USER_NAME, DATE_FORMAT(p.CDATETIME, '%Y-%m-%d %H시 %i분') AS CDATETIME, CONCAT(i.U_IMG_PATH, i.U_IMG_NAME) AS POST_PATH, CONCAT(pro.U_IMG_PATH, pro.U_IMG_NAME) AS USER_PATH, IFNULL(H.CNT, 0) AS HEART_CNT
        FROM post p
        INNER JOIN post_image i
          ON p.POST_NO = i.POST_NO
        INNER  JOIN user u
	       ON u.USER_NO = p.USER_NO
        INNER JOIN profile_image pro
          ON p.USER_NO = pro.USER_NO
        LEFT JOIN (
			 SELECT COUNT(*) AS CNT, POST_NO
			 FROM HEART
			 GROUP BY POST_NO
		  ) H ON p.POST_NO = H.POST_NO
        ORDER BY p.CDATETIME DESC`,
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
