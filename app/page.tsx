'use client';

import classnames from 'classnames';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Range } from 'react-input-range';
import { convertIndicatorFormat, minuteTickFormatter } from '@/shared/utils';
import {
  getVideoClipList,
  removeVideoClip,
  uploadVideoClip,
} from '@/libs/client/video';
import { Video, createVideoResponse } from '@/interface/video';
import Slider from '@/components/slider';
import {
  MinusCircleIcon,
  ScissorsIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import useSWR, { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';
import Player from '@/components/player';
import { TimeRangeStore, videoStore } from '@/shared/store/globlaStore';

export default function Home() {
  const { mutate } = useSWRConfig();

  const { data: session } = useSession();
  const {
    data: videoClipList,
    error,
    mutate: mutateVideoClips,
  } = getVideoClipList();

  const searchInput = useRef<HTMLInputElement>(null);

  // const playerRef = useRef<ReactPlayer>(null);

  const [hasMounted, setHasMounted] = useState(false);

  const [name, setName] = useState('');

  const [videoUrl, setVideoUrl] = useState('');

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
    reset: resetVideoState,
  } = videoStore((state) => state);

  const handleVideoSet = () => {
    searchInput.current && setVideoUrl(searchInput.current?.value);
    resetVideoState();
    resetTimeRange();
  };

  const handleRemoveVideo = async (id: number) => {
    const res = await removeVideoClip(id).then((res) => {
      mutateVideoClips(videoClipList?.filter((clip) => clip.id !== id));

      return res;
    });
  };

  const handleVideoChange = (url: string, startAt: number, endAt: number) => {
    console.log('====================================');
    console.log('change video', startAt, endAt);
    console.log('====================================');

    setVideoUrl(url);
    setCurrentMin(startAt);
    setCurrentMax(endAt);
  };

  const handleVideoClipping = async () => {
    const res = await uploadVideoClip(
      createVideoResponse({
        name: name,
        startAt: currentMin!,
        endAt: currentMax!,
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
    <main className="flex min-h-screen flex-col items-center p-2 lg:p-24">
      <div className="flex flex-col w-full max-w-[1600px] justify-center items-center">
        <h1 className="font-bold text-3xl my-[40px] whitespace-nowrap">
          Youtube-clipper
        </h1>
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
            Watch video
          </button>
        </div>

        <div className="flex flex-col items-center  gap-4 mt-40">
          {videoUrl ? (
            hasMounted && (
              <Player
                videoUrl={videoUrl}
                currentMin={currentMin}
                currentMax={currentMax}
              />
            )
          ) : (
            <div className="w-full aspect-video bg-black" />
          )}
          <div className="my-6">
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

          {/* <div className="flex">
            <div className="border-[1px]  px-4 py-2 rounded-l">
              {convertIndicatorFormat(timeRange.min)}
            </div>
            <div className="border-[1px]  px-4 py-2 rounded-r">
              {convertIndicatorFormat(timeRange.max)}
            </div>
          </div> */}
          {session && (
            <>
              <input
                type="text"
                placeholder="이름"
                className="rounded border border-[#E9E9EA] w-96 shadow-sm p-2"
                onInput={(event) => {
                  setName(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  event.key === 'Enter' && setName(event.currentTarget.value);
                }}
              />
              <button
                className="flex justify-center items-center h-[40px] px-[12px] py-2
          border-[1px] border-green-500 rounded-lg text-green-500 hover:border-transparent hover:bg-green-500 hover:text-white transition-all"
                onClick={handleVideoClipping}
              >
                저장 <ScissorsIcon className="w-[16px]" />
              </button>
              <div className="flex flex-col items-center mt-10">
                <div className="font-bold text-lg mb-2">저장 목록</div>
                {videoClipList && videoClipList.length > 0 ? (
                  <ol className="flex flex-col gap-4">
                    {videoClipList &&
                      videoClipList.map((video) => (
                        <li
                          key={video.id}
                          className="flex w-96 justify-between items-center border-[1px] bg-gray-100 border-none  rounded-lg px-6 py-2 cursor-pointer"
                          onClick={() =>
                            handleVideoChange(
                              video.videoUrl,
                              video.startAt,
                              video.endAt,
                            )
                          }
                        >
                          <div className="font-bold ">{`${video.name}`}</div>
                          <div className="flex gap-4 font-light text-sm ">
                            <div>{`${convertIndicatorFormat(
                              video.startAt,
                            )} ~ ${convertIndicatorFormat(video.endAt)}`}</div>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleRemoveVideo(video.id);
                              }}
                            >
                              <TrashIcon className="w-4 " />
                            </button>
                          </div>
                        </li>
                      ))}
                  </ol>
                ) : (
                  <p className="text-gray-300">클립이 없습니다.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
