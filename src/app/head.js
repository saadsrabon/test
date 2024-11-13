// app/head.js

import Script from 'next/script';

const Head = () => {
  return (
    <>
      <Script
        strategy="beforeInteractive"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />
      <title>My Website</title>
    </>
  );
};

export default Head;
