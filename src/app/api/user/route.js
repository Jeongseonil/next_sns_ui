import { NextResponse } from 'next/server'
import db from '../../db';
import { Formidable } from "formidable";


export async function GET(req) { 
  try {
    const results = await new Promise((resolve, reject) => {
      const { searchParams } = new URL(req.url)
      const param1 = searchParams.get('param1')
      db.query(
        `SELECT U.USER_NAME, U.USER_INTRODUCTION, U.USER_GENDER, P.U_IMG_PATH, P.U_IMG_NAME, COUNT(P2.POST_NO) AS POST_CNT, COUNT(F.FOLLOW_NO) AS FOLLOWER_CNT, COUNT(F2.FOLLOW_NO) AS FOLLOW_CNT
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

export async function POST(req, res) {
  try {
    console.log(NextResponse);
    const form = new Formidable(); // 클라이언트가 전달한 업데이트할 데이터
    console.log(req);
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('FormData 파싱 중 오류 발생:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      // fields는 폼 필드 데이터, files는 업로드된 파일 정보를 포함합니다.
      const { name, introduction, gender, no } = fields;
      const { image } = files;
      console.log(name);
      const updateResult = await new Promise((resolve, reject) => {
        db.query('UPDATE USER SET USER_NAME = ?, USER_INTRODUCTION = ?, USER_GENDER = ? WHERE USER_NO = ?', [name, introduction, gender, no], (err, result) => {
          if (err) {
            console.error('데이터 업데이트 중 오류 발생:', err);
            reject(err);
          } else {
            console.log('데이터가 성공적으로 업데이트되었습니다.');
            resolve(result);
          }
        });
      });

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('FormData가 파싱되었습니다.');
    });



    return NextResponse.json({ message: '수정되었습니다.' });
  } catch (error) {
    console.error('PUT 요청 처리 중 오류 발생:', error);
    return NextResponse.error('데이터를 업데이트할 수 없습니다.', 500);
  }
}