import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import client from '@/libs/server/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const deleteRes = await client.video.deleteMany({
        where: {
          id: Number(req.nextUrl.pathname.split('/').at(-1)),
        },
      });
      console.log('delete res', deleteRes);
      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({ result: 'session not exist' });
    }
  } catch (error) {
    throw error;
  }
}
