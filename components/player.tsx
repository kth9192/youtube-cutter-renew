import React, { forwardRef, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Range } from 'react-input-range';
import { convertIndicatorFormat, minuteTickFormatter } from '@/shared/utils';
import { TimeRangeStore, videoStore } from '@/shared/store/globlaStore';

interface PlayerProps {
  videoUrl: string;
  currentMin: number;
  currentMax: number;
}

const Player = ({ videoUrl, currentMin, currentMax }: PlayerProps) => {
  const { setCurrentMin, setCurrentMax } = videoStore((state) => state);

  const { rangeMax, setRangeMin, setRangeMax, setFullLeng } = TimeRangeStore(
    (state) => state,
  );

  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    playerRef.current?.seekTo(currentMin ?? 0);
  }, [currentMin]);

  return (
    <div className="aspect-video relative pt-[56.25%]">
      <ReactPlayer
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
        ref={playerRef}
        url={videoUrl}
        playing={true}
        muted={true}
        config={{
          youtube: {
            playerVars: {
              start: currentMin,
              end: currentMax,
            },
          },
        }}
        loop
        controls={true}
        onReady={() => {
          console.log('onstart', currentMin, currentMax);

          const url = new URL(videoUrl);
          const searchParams = url.searchParams;

          console.log(
            'onstart t',
            searchParams.get('t'),
            parseInt(searchParams.get('t')!),
            playerRef.current?.getDuration(),

            currentMin,
            currentMax,
          );

          if (searchParams.get('t')) {
            setCurrentMin(parseInt(searchParams.get('t')!));
            setCurrentMax(playerRef.current?.getDuration() ?? 0);
            setFullLeng(playerRef.current?.getDuration() ?? 0);
          } else if (searchParams.get('start') || searchParams.get('end')) {
            setCurrentMin(Number(searchParams.get('start')) ?? 0);
            setCurrentMax(
              Number(searchParams.get('end')) ??
                playerRef.current?.getDuration(),
            );
            setFullLeng(playerRef.current?.getDuration() ?? 0);

            playerRef.current?.seekTo(Number(searchParams.get('start')) ?? 0);
          } else {
            setFullLeng(playerRef.current?.getDuration() ?? 0);

            setCurrentMin(currentMin);
            setCurrentMax(
              currentMax > 0
                ? currentMax
                : playerRef.current?.getDuration() ?? 0,
            );

            //   setRangeMin(currentMin ?? 0);

            //   setRangeMax(
            //     currentMax > 0 ? currentMax : playerRef.current?.getDuration() ?? 0,
            //   );
            console.log('test', playerRef.current?.getDuration(), currentMax);
          }
        }}
      />
    </div>
  );
};

export default Player;
