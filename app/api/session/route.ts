import { deleteTmpUserData } from '@/libs/client/user';
import {
  SessionData,
  defaultSession,
  sessionOptions,
} from '@/libs/server/auth';
import client from '@/libs/server/client';
import { generateRandomNumber } from '@/shared/utils';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// login
export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const {
    username = 'No username',
    email = 'no email',
    userId = 'no id',
    password = 'no pw',
  } = (await request.json()) as {
    username: string;
    email: string;
    userId: string;
    password: string;
  };

  session.isLoggedIn = true;
  session.username = username;
  session.email = email;
  session.userId = userId;
  await session.save();
  console.log('login', session);

  const findUser = await client.user.findFirst({
    where: {
      email: session?.email,
    },
  });

  if (findUser) {
    console.log('user exist', findUser);
  } else {
    console.log('user not exist');

    const newUser = await client.user.create({
      data: {
        userId: userId,
        name: username,
        email: email,
      },
    });

    console.log('newuser', newUser);
  }

  return NextResponse.json(session);
}

// read session
export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (session.isLoggedIn !== true) {
    return NextResponse.json(defaultSession);
  }

  return NextResponse.json(session);
}

// logout
export async function DELETE() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  deleteTmpUserData();

  session.destroy();

  return NextResponse.json(defaultSession);
}
