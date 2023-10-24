import useSWR from 'swr';
import React from 'react';
import instance from '@/shared/instance';

export const deleteTmpUserData = async () => {
  const res = await instance.delete('/auth/clean').catch((err) => {
    throw err;
  });

  return res.data;
};
