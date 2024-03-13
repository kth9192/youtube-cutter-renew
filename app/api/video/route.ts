import { VideoRequest } from '@/app/interface/video';
import { SessionData, sessionOptions } from '@/libs/server/auth';
import client from '@/libs/server/client';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  // const token = getToken({
  //   req,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });

  try {
    if (session) {
      const getVideoList = await client.video.findMany({
        where: { userId: session.user?.userId },
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

  console.log('userid', session?.user.userId);

  if (!session) {
    return NextResponse.json({ status: 403 });
  }

  try {
    const tmp: { data: VideoRequest } = await req.json();

    const createVideo = await client.video.create({
      data: {
        name: tmp.data.name,
        startAt: tmp.data.startAt,
        endAt: tmp.data.endAt,
        videoUrl: tmp.data.videoUrl,
        user: {
          connect: { email: session?.user?.email ?? '' },
        },
      },
    });

    console.log(createVideo);

    return NextResponse.json({});
  } catch (error) {
    throw error;
  }
}
