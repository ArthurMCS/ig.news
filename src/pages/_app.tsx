import React from 'react';
import '../styles/global.scss'
import { Header } from '../components/Header';
import { SessionProvider as NextAuthProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
