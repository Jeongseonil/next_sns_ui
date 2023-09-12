import { NextResponse } from 'next/server'
import db from '../../../db';

export async function GET(req) { 
  try {
    const results = await new Promise((resolve, reject) => {
      const { searchParams } = new URL(req.url)
      const email = searchParams.get('email')
      db.query(
        `SELECT COUNT(*) AS CNT FROM USER WHERE USER_ID = '${email}'`,
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