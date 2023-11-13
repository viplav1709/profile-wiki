import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { ClerkProvider } from '@clerk/nextjs';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Users Directory</title>
      </Head>
      <main className="app">
        <ClerkProvider
          {...pageProps}
          navigate={(to) => {
            window.location.href = to;
          }}
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          <Component {...pageProps} />
        </ClerkProvider>
      </main>
    </>
  );
}

export default CustomApp;

