import client from '@/libs/server/client';
import { generateRandomNumber } from '@/shared/utils';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface User {
    id: number;
  }
}

//google oauth
// export const authOptions: NextAuthOptions = NextAuth({
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       if (account && account.provider === 'google') {
//         try {
//           const findUser = await client.user.upsert({
//             where: {
//               email: user.email!,
//             },
//             update: {},
//             create: {
//               userId: user.id,
//               email: user.email || '',
//               name: user.name || '',
//             },
//           });
//           console.log(findUser);
//         } catch (error) {
//           console.log('====================================');
//           console.log('유저 에러', error);
//           console.log('====================================');
//         }

//         console.log('====================================');
//         console.log('user ', user);
//         console.log('profile', profile);
//         console.log('====================================');
//       }
//       return true;
//     },
//     jwt({ token, account, user }) {
//       console.log('====================================');
//       console.log('user jwt', user, account);
//       console.log('====================================');
//       if (account) {
//         token.accessToken = account.access_token;
//         token.email = user?.email;
//       }
//       return token;
//     },
//     session({ session, token }) {
//       console.log('====================================');
//       console.log('session', session, token);
//       console.log('====================================');
//       if (session && session.user) {
//         session.user.email = token.email;
//       }

//       return session;
//     },
//   },
// });

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
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
