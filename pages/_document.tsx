import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        {/* pwa manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* favicons */}
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg"></link>
        <link rel="apple-touch-icon" href="/icons/favicon-32x32.png"></link>
        <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="fast type" />
        <meta
          property="og:description"
          content="Fast and Minimal Typing App - Improve your typing speed."
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="fast type" />
        <meta
          name="twitter:description"
          content="Fast and Minimal Typing App - Improve your typing speed."
        />


        {/* Critical Font CSS  */}
        <style
          data-id="critical"
          dangerouslySetInnerHTML={{
            __html: `
						@font-face {
							font-family: 'InputMono';
							font-style: normal;
							font-weight: 400;
							font-display: swap;
							src: url(/InputMono-Light.woff2) format('woff2');
						}

						body {
							font-family: 'InputMono', monospace;
						}
					`
          }}
        ></style>
      </Head>
      <body data-theme="0">
        <script
          dangerouslySetInnerHTML={{
            __html: `
						const theme = localStorage.getItem('theme');
						if (theme) {
							document.body.setAttribute('data-theme', theme);
						}
					`
          }}
        ></script>

        <Main />
      </body>
      <NextScript />
    </Html>
  )
}
