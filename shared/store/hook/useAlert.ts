import { systemStore } from '@/shared/store/globlaStore';
import React, { useState, useEffect } from 'react';

// interface useAlertProps {

// }

function useAlert() {
  const [visible, setVisible] = useState(false);

  const { toastVisible, setToastVisible } = systemStore((state) => state);

  useEffect(() => {
    setVisible(toastVisible);
  }, [toastVisible]);

  useEffect(() => {
    const timer = setTimeout(() => setToastVisible(false), 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [visible]);

  useEffect(() => {
    console.log('visible', visible);
  }, [visible]);

  return { visible };
}

export default useAlert;
