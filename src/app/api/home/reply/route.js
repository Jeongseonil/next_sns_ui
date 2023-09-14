import { NextResponse } from 'next/server'
import db from '../../../db';


export async function GET(req) { 
  try {
    const { searchParams } = new URL(req.url)
    const param1 = searchParams.get('param1')
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT r.REPLY_NO, c.COMMENT_NO, REPLY_CONTENT, DATE_FORMAT(r.CDATETIME, '%Y-%m-%d') AS CDATETIME, CONCAT(p.U_IMG_PATH, p.U_IMG_NAME) AS USER_PATH, u.USER_NAME, r.USER_NO
        FROM reply r
        INNER JOIN comment c
          ON r.COMMENT_NO = c.COMMENT_NO
        INNER JOIN user u
          ON r.USER_NO = u.USER_NO
        INNER JOIN profile_image p
          ON r.USER_NO = p.USER_NO	
        WHERE POST_NO = ?`, [param1],
        (err, results) => {
            if (err) {
            console.error('데이터를 검색 중 오류 발생:', err);
            reject(err);
            } else {
            resolve(results);
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
    const requestData = await req.json();
    const results = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO REPLY (USER_NO, COMMENT_NO, REPLY_CONTENT) VALUES(?, ?, ?)`, [requestData.userNo, requestData.commentNo, requestData.reply],
        (err, result) => {
            if (err) {
              console.error('데이터를 저장하는 중 오류 발생:', err);
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

export async function PUT(req) {
  try {
    const requestData = await req.json();
    const results = await new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM REPLY WHERE REPLY_NO = ?`, [requestData.replyNo],
        (err, result) => {
            if (err) {
              console.error('데이터를 삭제하는 중 오류 발생:', err);
              reject(err);
            } else {
              console.log('데이터가 성공적으로 삭제되었습니다.');
              resolve(result);
            }
        });
    });

    return NextResponse.json({ message: '데이터가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    return NextResponse.error('데이터를 가져올 수 없습니다.', 500);
  }
}