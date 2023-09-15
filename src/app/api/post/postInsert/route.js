import { NextResponse } from 'next/server'
import db from '../../../db';
import { promises as fs } from 'fs'; // 프로미스
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req) { 
  try {
    const { searchParams } = new URL(req.url)
    const param1 = searchParams.get('param1')
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT p.USER_NO, p.POST_NO, p.POST_CONTENT, p.POST_HASHTAG, u.USER_NAME, DATE_FORMAT(p.CDATETIME, '%Y-%m-%d %H시 %i분') AS CDATETIME, CONCAT(i.U_IMG_PATH, i.U_IMG_NAME) AS POST_PATH, CONCAT(pro.U_IMG_PATH, pro.U_IMG_NAME) AS USER_PATH, IFNULL(H.CNT, 0) AS HEART_CNT
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
        WHERE p.POST_NO = ?`, [param1],
        (err, results) => {
            if (err) {
            console.error('데이터를 검색 중 오류 발생:', err);
            reject(err);
            } else {
            resolve(results[0]);
            }
        });
    });
    return NextResponse.json(results);
  } catch (error) {
    console.error('데이터를 검색 중 오류 발생:', error);
    return NextResponse.error('데이터를 검색할 수 없습니다.', 500);
  }
}


export async function POST(req) {
  try {
    var data = await req.formData();
    
    const results = await new Promise((resolve, reject) => {
      db.query('INSERT INTO POST(USER_NO, POST_CONTENT, POST_HASHTAG) VALUES(?, ?, ?)', [data.get("userNo"), data.get("content"), data.get("hashTag")], (err, result) => {
        if (err) {
          console.error('데이터 업데이트 중 오류 발생:', err);
          reject(err);
        } else {
          console.log('데이터가 성공적으로 업데이트되었습니다.');
          resolve(result);
        }
      });
    });
    console.log(results.insertId);

    if(data.get('image') != "undefined"){
      const file = data.get('image'); // 보내는 쪽이랑 이름 맞출 것
      const filename = uuidv4() + path.extname(file.name);
      const filepath = path.join(process.cwd(), 'public', filename);
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await fs.writeFile(filepath, buffer);

      const updateResult2 = await new Promise((resolve, reject) => {
        db.query('INSERT INTO POST_IMAGE(U_IMG_ORG_NAME, U_IMG_NAME, U_IMG_SIZE, POST_NO) VALUES(?, ?, ?, ?)', [file.name, filename, file.size, results.insertId], (err, result) => {
          if (err) {
            console.error('데이터 입력 중 오류 발생:', err);
            reject(err);
          } else {
            console.log('데이터가 성공적으로 입력되었습니다.');
            resolve(result);
          }
        });
      });
    }

    return NextResponse.json({ message: '업로드 되었습니다..' });
  } catch (error) {
    console.error('PUT 요청 처리 중 오류 발생:', error);
    return NextResponse.error('데이터를 업데이트할 수 없습니다.', 500);
  }
}