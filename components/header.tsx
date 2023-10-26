'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter, redirect } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { deleteTmpUserData } from '@/libs/client/user';

function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const moveToHome = () => {
    redirect('/');
  };

  const handleLogin = () => {
    signIn();
  };

  const handleLogout = () => {
    deleteTmpUserData();
    signOut();
  };

  return !pathname.includes('signin') ? (
    <header className="flex justify-between items-center w-full h-[64px] shadow px-4 lg:px-8">
      <div className="cursor-pointer" onClick={moveToHome}>
        <Image src={'/cut.png'} alt={'logo'} width={100} height={100} />
      </div>

      {session ? (
        <button
          className="flex justify-center items-center w-fit h-[48px] px-3 rounded-lg hover:text-white hover:bg-red-500"
          type="button"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      ) : (
        <button
          className="flex justify-center items-center w-fit h-[40px] px-3 text-white rounded-lg bg-[#9D56F7]"
          type="button"
          onClick={handleLogin}
        >
          회원가입 없이 자동 로그인
        </button>
      )}
    </header>
  ) : null;
}

export default Header;
