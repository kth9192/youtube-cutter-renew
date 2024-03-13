import client from '@/libs/server/client';
import { getIronSession } from 'iron-session';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SessionData, sessionOptions } from '@/libs/server/auth';

export async function DELETE(req: NextRequest, res: NextResponse) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  console.log(session);

  try {
    if (session && session.username) {
      if (session.username) {
        const cleanVideo = await client.video.deleteMany({
          where: { userId: session.userId },
        });

        console.log('cleanVideo', cleanVideo);
      }

      if (session.email) {
        const cleanTmpUser = await client.user.delete({
          where: { userId: session.userId },
        });

        console.log('cleanTmpUser', cleanTmpUser);
      }

      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({ result: 'session not exist' });
    }
  } catch (error) {
    console.error(error);

    throw error;
  }
}
