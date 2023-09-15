import { NextResponse } from 'next/server'
import db from '../../../db';


export async function GET(req) { 
  try {
    const { searchParams } = new URL(req.url)
    const param1 = searchParams.get('param1')
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT c.COMMENT_NO, c.COMMENT_CONTENT, DATE_FORMAT(c.CDATETIME, '%Y-%m-%d') AS CDATETIME, CONCAT(p.U_IMG_PATH, p.U_IMG_NAME) AS USER_PATH, u.USER_NAME, c.USER_NO
        FROM comment c
        INNER JOIN user u
          ON c.USER_NO = u.USER_NO
        INNER JOIN profile_image p
          ON c.USER_NO = p.USER_NO	
        WHERE POST_NO = ?
        ORDER BY c.CDATETIME DESC`, [param1],
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
        `INSERT INTO COMMENT (USER_NO, POST_NO, COMMENT_CONTENT) VALUES(?, ?, ?)`, [requestData.userNo, requestData.postNo, requestData.comment],
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
        `DELETE FROM reply WHERE COMMENT_NO = ?`, [requestData.commentNo],
        (err, result) => {
            if (err) {
              console.error('데이터를 삭제하는 중 오류 발생:', err);
              reject(err);
            } else {
              console.log('데이터가 성공적으로 삭제되었습니다.');
            }
        });

    db.query(
      `DELETE FROM COMMENT WHERE COMMENT_NO = ?`, [requestData.commentNo],
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