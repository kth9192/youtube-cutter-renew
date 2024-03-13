'use client';

import React, { useEffect, useTransition } from 'react';
import Image from 'next/image';
import { useRouter, redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { deleteTmpUserData } from '@/libs/client/user';
import useSession from '@/app/useSession';
import { generateRandomNumber } from '@/shared/utils';
import { defaultSession } from '@/libs/server/auth';

function Header() {
  let [isPending, startTransition] = useTransition();

  const { session, isLoading, login, logout } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const moveToHome = () => {
    redirect('/');
  };

  const handleLogin = async () => {
    // router.push('/auth/signin');
    console.log('click');

    login('tmpuser', {
      optimisticData: {
        isLoggedIn: true,
        username: 'tmpuser',
        userId: generateRandomNumber(21),
        password: generateRandomNumber(8),
      },
    });
  };

  const handleLogout = () => {
    deleteTmpUserData();

    logout(null, {
      optimisticData: defaultSession,
    });
  };

  useEffect(() => {
    console.log('sessipon', session);
  }, [session]);

  return !pathname.includes('signin') ? (
    <header className="flex justify-between  items-center w-full h-[64px] shadow bg-white px-4 lg:px-8">
      <div className="cursor-pointer" onClick={moveToHome}>
        <Image src={'/cut.png'} alt={'logo'} width={100} height={100} />
      </div>

      {session.isLoggedIn ? (
        <button
          className="flex justify-center items-center w-fit h-[48px] px-3 rounded-lg text-gray-400 hover:text-white hover:bg-red-500"
          type="button"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      ) : (
        <button
          className="flex justify-center items-center w-fit h-[40px] px-3 text-white rounded-lg bg-[#9D56F7]"
          type="button"
          onClick={() =>
            startTransition(() => {
              handleLogin();
            })
          }
        >
          회원가입 없이 자동 로그인
        </button>
      )}
    </header>
  ) : null;
}

export default Header;
