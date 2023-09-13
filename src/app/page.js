"use client"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  let r = useRouter();
  useEffect(() => {
    if(Cookies.get("userNo") == undefined){
      r.push("/login");
    }
  })
  return (
   <></>
  )
}
