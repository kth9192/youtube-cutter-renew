import { create } from 'zustand';

interface SystemState {
  toastVisible: boolean;
  setToastVisible: (isShow: boolean) => void;
}

interface VideoState {
  videoId?: number;
  videoUrl: string;
  title: string;
  currentMin: number;
  currentMax: number;
  setCurrentMin: (id: number) => void;
  setCurrentMax: (id: number) => void;
  setVideoUrl: (url: string) => void;
  setVideoTitle: (name: string) => void;
  setVideoId: (id: number) => void;
  reset: () => void;
}

interface TimeRangeState {
  rangeMin: number;
  rangeMax: number;
  fullLeng: number;
  setRangeMin: (id: number) => void;
  setRangeMax: (id: number) => void;
  setFullLeng: (id: number) => void;
  reset: () => void;
}

const initialVideoTime = {
  videoId: undefined,
  currentMin: 0,
  currentMax: 0,
};

const initialTimeRange = {
  rangeMin: 0,
  rangeMax: 0,
};

export const systemStore = create<SystemState>((set) => ({
  toastVisible: false,
  setToastVisible: (isShow: boolean) =>
    set((state) => ({ toastVisible: isShow })),
}));

export const videoStore = create<VideoState>((set) => ({
  videoId: undefined,
  currentMin: 0,
  currentMax: 0,
  videoUrl: '',
  title: '',
  setVideoId: (id: number) => set((state) => ({ videoId: id })),
  setCurrentMin: (min: number) => set((state) => ({ currentMin: min })),
  setCurrentMax: (max: number) => set((state) => ({ currentMax: max })),
  setVideoUrl: (url: string) => set((state) => ({ videoUrl: url })),
  setVideoTitle: (name: string) => set((state) => ({ title: name })),
  reset: () => {
    set(initialVideoTime);
  },
}));

export const TimeRangeStore = create<TimeRangeState>((set) => ({
  rangeMin: 0,
  rangeMax: 0,
  fullLeng: 0,
  setRangeMin: (min) => set((state) => ({ rangeMin: min })),
  setRangeMax: (max) => set((state) => ({ rangeMax: max })),
  setFullLeng: (leng) => set((state) => ({ fullLeng: leng })),
  reset: () => {
    set(initialTimeRange);
  },
}));
