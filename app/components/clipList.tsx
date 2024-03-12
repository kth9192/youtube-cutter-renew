import { Video } from '@/app/interface/video';
import { getVideoClipList, removeVideoClip } from '@/libs/client/video';
import { systemStore, videoStore } from '@/shared/store/globlaStore';
import { convertIndicatorFormat } from '@/shared/utils';
import {
  TrashIcon,
  PlayIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

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
    setVideoTitle,
    reset: resetVideoState,
  } = videoStore((state) => state);

  const { toastVisible, setToastVisible } = systemStore((state) => state);

  const handleVideoChange = (
    url: string,
    startAt: number,
    endAt: number,
    id: number,
    name: string,
  ) => {
    setVideoUrl(url);
    setCurrentMin(startAt);
    setCurrentMax(endAt);
    setVideoId(id);
    setVideoTitle(name);
  };

  const handleCopyVideoLink = async (coppedLink: string) => {
    try {
      await navigator.clipboard.writeText(coppedLink);
      setToastVisible(true);
    } catch (error) {
      console.log(error);
    }
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
        <div className="font-bold">
          <ClipLoader color="#36d7b7" />
        </div>
      ) : videoClipList && videoClipList.length > 0 ? (
        <ol className="flex flex-col gap-4">
          {videoClipList &&
            videoClipList.map((video) => (
              <li
                key={video.id}
                className="flex w-96 justify-between items-center border-[1px] border-none bg-white rounded-lg p-2 "
              >
                <div
                  className="flex items-center gap-1 cursor-pointer pl-2"
                  onClick={() =>
                    handleVideoChange(
                      video.videoUrl,
                      video.startAt,
                      video.endAt,
                      video.id,
                      video.name,
                    )
                  }
                >
                  <PlayIcon className="w-5 h-5" />
                  <div className="w-[75px] font-bold truncate ">{`${video.name}`}</div>

                  <div className="ml-4">{`${convertIndicatorFormat(
                    video.startAt,
                  )} ~ ${convertIndicatorFormat(video.endAt)}`}</div>
                </div>

                <div className="flex gap-4 font-light text-sm ">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleCopyVideoLink(
                        `${video.videoUrl}?t=${video.startAt}`,
                      );
                    }}
                  >
                    <ClipboardDocumentIcon className="w-4" />
                  </button>

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
