import React from "react"
import { Html, Head, Main, NextScript } from 'next/document'

const Document = () =>
    <Html data-theme="bumblebee">
        <Head>
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <body className="h-screen">
            <Main />
            <NextScript />
        </body>
    </Html>

export default Document