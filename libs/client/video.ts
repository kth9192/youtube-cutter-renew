import instance from '@/shared/instance';
import { Video, VideoRequest } from '@/app/interface/video';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';

const clipListFetcher = async (url: string) =>
  await instance.get('/video').then((res) => res.data);

export const uploadVideoClip = async (
  videoObj: VideoRequest,
): Promise<AxiosResponse> => {
  return await instance.post(
    '/video',
    { data: videoObj },
    {
      headers: { 'Content-Type': `application/json` },
    },
  );
};

export const getVideoClipList = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<{
    data: Video[];
  }>('getvideoClipList', clipListFetcher);

  console.log('video', data);

  return { data: data?.data, error, isLoading, mutate, isValidating };
};

export const removeVideoClip = async (id: number): Promise<AxiosResponse> => {
  return await instance.delete(`/video/${id}`);
};
