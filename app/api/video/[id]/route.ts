import { SessionData, sessionOptions } from '@/libs/server/auth';
import client from '@/libs/server/client';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, res: NextResponse) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  try {
    if (session) {
      const deleteRes = await client.video.deleteMany({
        where: {
          id: Number(req.nextUrl.pathname.split('/').at(-1)),
        },
      });

      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({ result: 'session not exist' });
    }
  } catch (error) {
    throw error;
  }
}
