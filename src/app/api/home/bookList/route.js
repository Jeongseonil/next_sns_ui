import { NextResponse } from 'next/server'
import db from '../../../db';


export async function GET(req) { 
  try {
    const { searchParams } = new URL(req.url)
    const param1 = searchParams.get('param1')
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT POST_NO FROM BOOKMARK WHERE USER_NO = ?`, [param1],
        (err, results) => {
            if (err) {
            console.error('데이터를 입력 중 오류 발생:', err);
            reject(err);
            } else {
            resolve(results);
            }
        });
    });
    return NextResponse.json(results);
  } catch (error) {
    console.error('데이터를 입력 중 오류 발생:', error);
    return NextResponse.error('데이터를 입력할 수 없습니다.', 500);
  }
}
