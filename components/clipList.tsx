import { getVideoClipList, removeVideoClip } from '@/libs/client/video';
import { videoStore } from '@/shared/store/globlaStore';
import { convertIndicatorFormat } from '@/shared/utils';
import { TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';

function ClipList() {
  const {
    data: videoClipList,
    error,
    mutate: mutateVideoClips,
    isLoading: videoClipsLoading,
    isValidating: videoValidating,
  } = getVideoClipList();

  const {
    currentMin,
    currentMax,
    setCurrentMin,
    setCurrentMax,
    setVideoUrl,
    reset: resetVideoState,
  } = videoStore((state) => state);

  const handleVideoChange = (url: string, startAt: number, endAt: number) => {
    console.log('====================================');
    console.log('change video', startAt, endAt);
    console.log('====================================');

    setVideoUrl(url);
    setCurrentMin(startAt);
    setCurrentMax(endAt);
  };

  const handleRemoveVideo = async (id: number) => {
    const res = await removeVideoClip(id).then((res) => {
      mutateVideoClips(videoClipList?.filter((clip) => clip.id !== id));

      return res;
    });
  };

  return (
    <>
      {videoClipsLoading || videoValidating ? (
        <div className="font-bold">is loading...</div>
      ) : videoClipList && videoClipList.length > 0 ? (
        <ol className="flex flex-col gap-4">
          {videoClipList &&
            videoClipList.map((video) => (
              <li
                key={video.id}
                className="flex w-96 justify-between items-center border-[1px] bg-gray-100 border-none  rounded-lg px-6 py-2 cursor-pointer"
                onClick={() =>
                  handleVideoChange(video.videoUrl, video.startAt, video.endAt)
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
    </>
  );
}

export default ClipList;