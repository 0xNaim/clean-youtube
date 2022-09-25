import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <meta charSet='utf-8' />
        <meta
          name='description'
          content="Clean youtube is a simple youtube playlist player. It was created for serious learners who really want to learn. When they watch YouTube videos, their attention is lost to other video suggestions that's why Clean YouTube comes. You can add a playlist via a playlist link or playlist id, then you can watch those playlists on Clean YouTube. I hope that you can seriously learn something."
        />
        <meta name='theme-color' content='#fff' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png'></link>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
