import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import Layout from '../components/Layout'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Language Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
