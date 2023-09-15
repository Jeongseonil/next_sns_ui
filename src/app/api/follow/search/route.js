import { NextResponse } from 'next/server'
import db from '../../../db';

export async function GET(req) { 
  try {
    const { searchParams } = new URL(req.url)
    const param1 = searchParams.get('param1')
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT FOLLOW_USER_NO FROM FOLLOW WHERE USER_NO = ?`, [param1],
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

export async function POST(req) {
  try {
    const requestData = await req.json();
    const results = await new Promise((resolve, reject) => {
        db.query(
          `SELECT f.USER_NO, u.USER_NAME, CONCAT(i.U_IMG_PATH, i.U_IMG_NAME) AS USER_PATH
          FROM follow f
          INNER JOIN user u
            ON f.USER_NO = u.USER_NO
          INNER JOIN profile_image i
            ON i.USER_NO = f.USER_NO	
          WHERE FOLLOW_USER_NO = ?`, [requestData.userNo],
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

export async function PUT(req) {
  try {
    const requestData = await req.json();
    const results = await new Promise((resolve, reject) => {
        db.query(
          `SELECT f.FOLLOW_USER_NO, u.USER_NAME, CONCAT(i.U_IMG_PATH, i.U_IMG_NAME) AS USER_PATH
          FROM follow f
          INNER JOIN user u
            ON f.FOLLOW_USER_NO = u.USER_NO
          INNER JOIN profile_image i
            ON i.USER_NO = f.FOLLOW_USER_NO	
          WHERE f.USER_NO = ?`, [requestData.userNo],
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