'use client';
import React, { useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import ClipLoader from 'react-spinners/ClipLoader';

function SigninPage() {
  const initialized = useRef(false);

  const handleLogin = async () => {
    const result = await signIn('credentials', {
      username: 'anon',
      redirect: true,
      callbackUrl: '/',
    });
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      handleLogin();
    }
  }, []);

  return (
    <main className="flex flex-col w-full h-screen justify-center items-center">
      <span className="font-medium">auto login...</span>
      <ClipLoader color="#36d7b7" />
    </main>
  );
}

export default SigninPage;
