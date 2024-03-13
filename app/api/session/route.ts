import {
  SessionData,
  defaultSession,
  sessionOptions,
} from '@/libs/server/auth';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

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
  session;
  await session.save();

  return Response.json(session);
}

// read session
export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json(session);
}

// logout
export async function DELETE() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  session.destroy();

  return Response.json(defaultSession);
}
