import client from '@/libs/server/client';
import { generateRandomNumber } from '@/shared/utils';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: '이메일 입력',
        },
      },

      async authorize(credentials, req) {
        if (typeof credentials !== 'undefined') {
          const findUser = await client.user.findFirst({
            where: {
              email: credentials?.username,
            },
          });

          if (findUser) {
            console.log('user exist', findUser);

            return findUser;
          } else {
            console.log('user not exist');

            const newUser = await client.user.create({
              data: {
                userId: generateRandomNumber(21),
                name: `testuser${generateRandomNumber(4)}`,
                email: `${generateRandomNumber(8)}@test.com`,
              },
            });

            console.log('newuser', newUser);

            return newUser;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};
