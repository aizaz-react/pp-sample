import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

export const authOptions = {
  session: {
    maxAge: 1 * 60 * 60
  },
  jwt: {
    maxAge: 1 * 60 * 60
  },
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      authorization: { params: { scope: 'openid profile user.Read email'} }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
      }
      return { ...token };
    },
    async session({ session, token }) {
      return { ...session, ...token };
    }
  }
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
