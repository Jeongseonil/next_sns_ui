import { NextResponse } from 'next/server'
import db from '../../db';
import { promises as fs } from 'fs'; // 프로미스
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req) { 
  try {
    const { searchParams } = new URL(req.url)
    const param1 = searchParams.get('param1')
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT p.POST_NO, p.USER_NO, CONCAT(i.U_IMG_PATH, i.U_IMG_NAME) AS POST_PATH
        FROM post p
        INNER JOIN post_image i
          ON p.POST_NO = i.POST_NO
        WHERE POST_CONTENT LIKE '%${param1}%'`,
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

}