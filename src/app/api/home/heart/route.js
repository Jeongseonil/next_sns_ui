import { NextResponse } from 'next/server'
import db from '../../../db';


export async function POST(req) { 
  try {
    const requestData = await req.json();
    const results = await new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO HEART(USER_NO, POST_NO) VALUES(?, ?)`, [requestData.userNo, requestData.postNo],
        (err, results) => {
            if (err) {
            console.error('데이터를 입력 중 오류 발생:', err);
            reject(err);
            } else {
            console.log('data ==> ', results);
            resolve(results);
            }
        });
    });
    return NextResponse.json({msg : "입력 성공"});
  } catch (error) {
    console.error('데이터를 입력 중 오류 발생:', error);
    return NextResponse.error('데이터를 입력할 수 없습니다.', 500);
  }
}

export async function PUT(req) { 
  try {
    const requestData = await req.json();
    const results = await new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM HEART WHERE USER_NO = ? AND POST_NO = ?`, [requestData.userNo, requestData.postNo],
        (err, results) => {
            if (err) {
            console.error('데이터를 입력 중 오류 발생:', err);
            reject(err);
            } else {
            console.log('data ==> ', results);
            resolve(results);
            }
        });
    });
    return NextResponse.json({msg : "삭제 성공"});
  } catch (error) {
    console.error('데이터를 입력 중 오류 발생:', error);
    return NextResponse.error('데이터를 입력할 수 없습니다.', 500);
  }
}
