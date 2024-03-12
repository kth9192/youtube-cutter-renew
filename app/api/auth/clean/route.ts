import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import client from '@/libs/server/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  try {
    if (session && session.user) {
      if (session.user.name) {
        const cleanVideo = await client.video.deleteMany({
          where: { name: session.user.name },
        });

        console.log('cleanVideo', cleanVideo);
      }

      if (session.user.email) {
        const cleanTmpUser = await client.user.delete({
          where: { email: session.user.email },
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
