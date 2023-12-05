import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const apiUrl = 'https://dummyjson.com/auth/login';
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();

        // Check if the authentication was successful
        if (response.ok && data.success) {
          // Return user data if authentication succeeded
          return Promise.resolve(data.user);
        } else {
          // Return null if authentication failed
          return Promise.resolve(null);
        }
      }
    }),
  ],
  pages: {
    signIn: '/login',
  }
});

