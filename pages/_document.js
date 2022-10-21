import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/images/QualityWorks-Logo.jpeg" />
          <link rel="preconnect" href="https://app.snipcart.com" />
          <link rel="preconnect" href="https://cdn.snipcart.com" />
          <link
            rel="stylesheet"
            href="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            async
            src="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js"
          />
          {/* <div hidden id="snipcart" data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY} /> */}
          <div
            hidden
            id="snipcart"
            data-api-key="MWUyMzQ2MmYtMThhZC00MGExLWI4OGItNjhhMGE2YjM1YzQ4NjM4MDE3NTA3NjYzMDMxNzY4"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
