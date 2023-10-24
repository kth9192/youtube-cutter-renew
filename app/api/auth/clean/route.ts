import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import client from '@/libs/server/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  try {
    if (session) {
      const cleanTmpUser = await client.video.deleteMany({
        where: { userId: 2 },
      });

      console.log('cleanTmpUser', cleanTmpUser);

      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({ result: 'session not exist' });
    }
  } catch (error) {
    console.error(error);

    throw error;
  }
}
