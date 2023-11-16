import { Video } from '@/interface/video';
import { getVideoClipList, removeVideoClip } from '@/libs/client/video';
import { videoStore } from '@/shared/store/globlaStore';
import { convertIndicatorFormat } from '@/shared/utils';
import { TrashIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
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
    setVideoId,
    setVideoUrl,
    reset: resetVideoState,
  } = videoStore((state) => state);

  const handleVideoChange = (
    url: string,
    startAt: number,
    endAt: number,
    id: number,
  ) => {
    console.log('====================================');
    console.log('change video', startAt, endAt);
    console.log('====================================');

    setVideoUrl(url);
    setCurrentMin(startAt);
    setCurrentMax(endAt);
    setVideoId(id);
  };

  const handleRemoveVideo = async (id: number) => {
    const tmp = videoClipList
      ? videoClipList.filter((clip) => clip.id !== id)
      : [];

    const res = await removeVideoClip(id).then((res) => {
      mutateVideoClips({ data: tmp });

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
                className="flex w-96 justify-between items-center border-[1px] bg-gray-100 border-none  rounded-lg px-6 py-2 "
              >
                <div
                  className="flex items-center gap-1"
                  onClick={() =>
                    handleVideoChange(
                      video.videoUrl,
                      video.startAt,
                      video.endAt,
                      video.id,
                    )
                  }
                >
                  <PlayCircleIcon className="w-5 h-5" />
                  <div className="font-bold cursor-pointer">{`${video.name}`}</div>
                </div>

                <div className="flex gap-4 font-light text-sm ">
                  <div>{`${Number(
                    convertIndicatorFormat(video.startAt),
                  )} ~ ${Number(convertIndicatorFormat(video.endAt))}`}</div>
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
