'use client';
import React, { useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';

function SigninPage() {
  const handleLogin = async () => {
    const result = await signIn('credentials', {
      username: 'kth9192@naver.com',
      redirect: true,
      callbackUrl: '/',
    });
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return <main>auto login...</main>;
}

export default SigninPage;
