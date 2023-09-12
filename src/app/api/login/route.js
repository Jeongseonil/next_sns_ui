import { NextResponse } from 'next/server'
import db from '../../db';

export async function GET() { 

}

const comparePasswords = async (plainPassword, hashedPassword, salt) => {
  try {
    const bcrypt = require('bcrypt');
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword)
    return isMatch;
  } catch (error) {
    throw error;
  }
};

export async function POST(req) {
  try {
    const requestData = await req.json();
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT USER_NO, USER_PWD, USER_PWD_SALT FROM USER WHERE USER_ID = '${requestData.email}'`,
        (err, results) => {
            if (err) {
            console.error('데이터를 가져오는 중 오류 발생:', err);
            reject(err);
            } else {
            resolve(results[0]);
            }
        });
    });
    let msg = "";
    if(results == undefined){
      msg = "아이디가 없습니다."
      return NextResponse.json({msg});
    } else {
      let pwd = await comparePasswords(requestData.pwd, results.USER_PWD, results.USER_PWD_SALT)
      if(!pwd){
        msg = "비밀번호가 다릅니다."
        return NextResponse.json({msg});
      }
    }
    msg = "로그인 성공";
    return NextResponse.json({msg});
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    return NextResponse.error('데이터를 가져올 수 없습니다.', 500);
  }
}

