export interface Video {
  id: number;
  name: string;
  createdAt: Date;
  startAt: number;
  endAt: number;
  videoUrl: string;
}

export interface VideoRequest {
  name: string;
  startAt: number;
  endAt: number;
  videoUrl: string;
}

export const createVideoResponse = ({
  name,
  startAt,
  endAt,
  videoUrl,
}: VideoRequest): VideoRequest => ({
  name,
  startAt,
  endAt,
  videoUrl,
});

export interface ResponseType {
  [key: string]: any;
}
