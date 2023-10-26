import { create } from 'zustand';

interface VideoState {
  currentMin: number;
  currentMax: number;
  setCurrentMin: (id: number) => void;
  setCurrentMax: (id: number) => void;
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
  currentMin: 0,
  currentMax: 0,
};

const initialTimeRange = {
  rangeMin: 0,
  rangeMax: 0,
};

export const videoStore = create<VideoState>((set) => ({
  currentMin: 0,
  currentMax: 0,
  setCurrentMin: (min: number) => set((state) => ({ currentMin: min })),
  setCurrentMax: (max: number) => set((state) => ({ currentMax: max })),
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
