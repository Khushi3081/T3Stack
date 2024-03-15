import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Provider } from "urql";
import { client } from "~/urql/urqlClientSeup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Provider value={client}>
      <SessionProvider session={session}>
        <main className={`font-sans ${inter.variable}`}>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
