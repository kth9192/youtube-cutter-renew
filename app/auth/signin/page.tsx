'use client';
import React, { useEffect, useRef } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

function SigninPage() {
  const initialized = useRef(false);

  const handleLogin = async () => {
    const result = await signIn('credentials', {
      username: 'anon',
      redirect: true,
      callbackUrl: '/',
    });

    console.log('login result', result);
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      handleLogin();
    }
  }, []);

  return (
    <main className="flex flex-col w-full h-screen justify-center items-center bg-[#F3F5F8]">
      <span className="font-medium">auto login...</span>
      <ClipLoader color="#36d7b7" />
    </main>
  );
}

export default SigninPage;
