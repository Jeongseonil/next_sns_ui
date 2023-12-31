import { NextResponse } from 'next/server'
import db from '../../../db';
import { promises as fs } from 'fs'; // 프로미스
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req) { 
  try {
    const results = await new Promise((resolve, reject) => {
      const { searchParams } = new URL(req.url)
      const param1 = searchParams.get('param1')
      db.query(
          `SELECT U.USER_NO, U.USER_NAME, U.USER_INTRODUCTION, U.USER_GENDER, P.U_IMG_PATH, P.U_IMG_NAME, IFNULL(POST_COUNT, 0) AS POST_CNT, IFNULL(FOLLOWER_COUNT, 0) AS FOLLOW_CNT, IFNULL(FOLLOWING_COUNT, 0) AS FOLLOWER_CNT
          FROM USER U
          INNER JOIN PROFILE_IMAGE P ON U.USER_NO = P.USER_NO
          LEFT JOIN (
              SELECT USER_NO, COUNT(*) AS POST_COUNT
              FROM POST
              WHERE USER_NO = ${param1}
          ) AS POSTS ON U.USER_NO = POSTS.USER_NO
          LEFT JOIN (
              SELECT USER_NO, COUNT(*) AS FOLLOWER_COUNT
              FROM follow
              WHERE USER_NO = ${param1}
          ) AS FOLLOWERS ON U.USER_NO = FOLLOWERS.USER_NO
          LEFT JOIN (
              SELECT FOLLOW_USER_NO, COUNT(*) AS FOLLOWING_COUNT
              FROM follow
              WHERE FOLLOW_USER_NO = ${param1}
          ) AS FOLLOWING ON U.USER_NO = FOLLOWING.FOLLOW_USER_NO
          WHERE U.USER_NO = ${param1};`,
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
    var data = await req.formData();

    if(data.get('image') != "undefined"){
      const file = data.get('image'); // 보내는 쪽이랑 이름 맞출 것
      const filename = uuidv4() + path.extname(file.name);
      const filepath = path.join(process.cwd(), 'public', filename);
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await fs.writeFile(filepath, buffer);

      const updateResult2 = await new Promise((resolve, reject) => {
        db.query('UPDATE profile_image SET U_IMG_ORG_NAME = ?, U_IMG_NAME = ?, U_IMG_SIZE = ?, UDATETIME = now() WHERE USER_NO = ?', [file.name, filename, file.size, data.get("no")], (err, result) => {
          if (err) {
            console.error('데이터 업데이트 중 오류 발생:', err);
            reject(err);
          } else {
            console.log('데이터가 성공적으로 업데이트되었습니다.');
            resolve(result);
          }
        });
      });
  

    }

    const updateResult = await new Promise((resolve, reject) => {
      db.query('UPDATE USER SET USER_NAME = ?, USER_INTRODUCTION = ?, USER_GENDER = ? WHERE USER_NO = ?', [data.get("name"), data.get("introduction"), data.get("gender"), data.get("no")], (err, result) => {
        if (err) {
          console.error('데이터 업데이트 중 오류 발생:', err);
          reject(err);
        } else {
          console.log('데이터가 성공적으로 업데이트되었습니다.');
          resolve(result);
        }
      });
    });

    return NextResponse.json({ message: '수정되었습니다.' });
  } catch (error) {
    console.error('PUT 요청 처리 중 오류 발생:', error);
    return NextResponse.error('데이터를 업데이트할 수 없습니다.', 500);
  }
}