import React from 'react';

interface ToastProps {
  message: React.ReactNode;
}

function Toast({ message }: ToastProps) {
  return (
    <div className="flex justify-center items-center bg-white shadow-lg w-[300px] h-[52px] rounded  absolute  ">
      {message}
    </div>
  );
}

export default Toast;
