import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { VideoRequest } from '@/interface/video';
import client from '@/libs/server/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  // const token = getToken({
  //   req,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });

  try {
    if (session) {
      const getVideoList = await client.video.findMany({
        where: { userId: 2 },
      });

      return NextResponse.json({ data: getVideoList });
    } else {
      return NextResponse.json({ result: 'session not exist' });
    }
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    throw error;
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  try {
    const tmp: { data: VideoRequest } = await req.json();

    const createVideo = await client.video.create({
      data: {
        name: tmp.data.name,
        startAt: tmp.data.startAt,
        endAt: tmp.data.endAt,
        videoUrl: tmp.data.videoUrl,
        user: {
          connect: { id: 2 },
        },
      },
    });

    return NextResponse.json({});
  } catch (error) {
    throw error;
  }
}
