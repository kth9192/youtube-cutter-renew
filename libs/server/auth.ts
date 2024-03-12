import client from '@/libs/server/client';
import { generateRandomNumber } from '@/shared/utils';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',

      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: '이메일 입력',
        },
      },

      async authorize(credentials, req) {
        try {
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
        } catch (error) {
          console.log(error);

          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
