'use client';

import ClipList from '@/components/clipList';
import Player from '@/components/player';
import Slider from '@/components/slider';
import Toast from '@/components/toast';
import { createVideoResponse } from '@/interface/video';
import { getVideoClipList, uploadVideoClip } from '@/libs/client/video';
import {
  TimeRangeStore,
  systemStore,
  videoStore,
} from '@/shared/store/globlaStore';
import useAlert from '@/shared/store/hook/useAlert';
import { ScissorsIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Range } from 'react-input-range';
import { useSWRConfig } from 'swr';

export default function Home() {
  const { mutate } = useSWRConfig();
  const { visible } = useAlert();

  const { data: session } = useSession();
  const {
    data: videoClipList,
    error,
    mutate: mutateVideoClips,
    isLoading: videoClipsLoading,
  } = getVideoClipList();

  const searchInput = useRef<HTMLInputElement>(null);

  // const playerRef = useRef<ReactPlayer>(null);

  const [hasMounted, setHasMounted] = useState(false);

  const [name, setName] = useState('');

  const {
    rangeMin,
    rangeMax,
    setRangeMin,
    setRangeMax,
    fullLeng,
    setFullLeng,
    reset: resetTimeRange,
  } = TimeRangeStore((state) => state);

  const {
    currentMin,
    currentMax,
    setCurrentMin,
    setCurrentMax,
    videoUrl,
    setVideoUrl,
    title,
    reset: resetVideoState,
  } = videoStore((state) => state);

  const handleVideoSet = () => {
    resetVideoState();
    resetTimeRange();
    searchInput.current && setVideoUrl(searchInput.current?.value);
  };

  const handleVideoClipping = async () => {
    const res = await uploadVideoClip(
      createVideoResponse({
        name: name,
        startAt: currentMin,
        endAt: currentMax,
        videoUrl: videoUrl,
      }),
    ).then((res) => mutate('getvideoClipList'));
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // useEffect(() => {
  //   playerRef.current?.seekTo(currentMin);
  // }, [currentMin]);

  return (
    <main className="flex min-h-screen flex-col items-center p-2 lg:p-24 ">
      <div className="flex flex-col w-full max-w-[1600px] justify-center items-center">
        <span className="flex flex-col items-center mt-[40px]">
          <Image
            src={'/youtube-logo.png'}
            alt={'logo'}
            width={64}
            height={64}
          />

          <h1 className="font-bold text-3xl  whitespace-nowrap">
            Youtube-clipper
          </h1>
        </span>

        <h2 className="mt-[30px] font-medium text-gray-400">
          좋아하는 유튜브 영상의 구간을 저장해 보세요!
        </h2>
        <div
          className={classnames(
            'flex w-full xl:w-[900px] gap-2 py-1.5  border-b-2',
            typeof document !== 'undefined' &&
              searchInput.current === document.activeElement &&
              'border-red-500',
          )}
        >
          <input
            ref={searchInput}
            type="text"
            className="w-full h-[48px] bg-transparent border-none mr-3 px-2 leading-tight focus:outline-none focus:ring-0  "
            placeholder="주소를 입력해 보세요!"
          />
          <button
            type="button"
            className="h-[40px] whitespace-nowrap bg-white border-[1px] border-[#3EA6FF] rounded-lg px-4 text-[#3EA6FF] hover:text-white hover:bg-[#3EA6FF] transition ease-in-out"
            onClick={handleVideoSet}
          >
            확인
          </button>
        </div>

        <div className="flex flex-col items-center  gap-4 mt-40">
          <h1
            className={classnames(
              'w-full truncate text-center',
              title
                ? 'font-bold text-black text-xl'
                : 'font-medium text-gray-400',
            )}
          >
            {title || '원하는 시간을 지정하고 영상을 저장해보세요'}
          </h1>
          {videoUrl ? (
            hasMounted && (
              <Player
                videoUrl={videoUrl}
                currentMin={currentMin}
                currentMax={currentMax}
              />
            )
          ) : (
            <div className="w-full aspect-video bg-white border-[1px] border-gray-200 " />
          )}
          <div className="flex w-full items-center gap-4 my-6">
            <ScissorsIcon className="w-6 h-6" />
            <Slider
              min={0}
              max={fullLeng}
              value={{ min: currentMin, max: currentMax }}
              onChange={(value: number | Range) => {
                if (typeof value !== 'number') {
                  setCurrentMin(value.min);
                  setCurrentMax(value.max);
                }
              }}
              onChangeComplete={(value: number | Range) => {
                console.log('onChangeComplete', value);

                if (typeof value !== 'number') {
                  setCurrentMin(value.min);
                  setCurrentMax(value.max);
                }
              }}
            />
          </div>

          {session && (
            <>
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  placeholder="이름"
                  className="rounded border border-[#E9E9EA] w-96 shadow-sm p-2 mb-4"
                  onInput={(event) => {
                    setName(event.currentTarget.value);
                  }}
                  onKeyDown={(event) => {
                    event.key === 'Enter' && setName(event.currentTarget.value);
                  }}
                />
                <button
                  className="flex justify-center items-center w-fit h-[40px] px-[12px] py-2 mb-4
          border-[1px] bg-white border-green-500 rounded-lg text-green-500 hover:border-transparent hover:bg-green-500 hover:text-white transition-all"
                  onClick={handleVideoClipping}
                >
                  저장 <ScissorsIcon className="w-[16px]" />
                </button>
              </div>

              <div className="flex flex-col items-center relative">
                <div className="font-bold text-lg mb-2">저장 목록</div>
                {visible && (
                  <Toast
                    message={
                      <div className="flex items-center gap-2 font-bold">
                        <CheckBadgeIcon className="w-5 text-green-500" />
                        coppied!
                      </div>
                    }
                  />
                )}

                <ClipList />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
