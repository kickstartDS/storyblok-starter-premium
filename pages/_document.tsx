import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import Script from "next/script";

class KsDocument extends Document<any> {
  static async getInitialProps(ctx: DocumentContext) {
    let pageProps = null;

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => {
          pageProps = props.pageProps;
          return <App {...props} />;
        },
        enhanceComponent: (Component) => Component,
      });

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, pageProps };
  }

  render() {
    const { pageProps } = this.props;

    return (
      <Html className={pageProps?.fontClassNames} lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <Script
            strategy="beforeInteractive"
            src="https://cdn.debugbear.com/U3aC0VFDm3bP.js"
          />
        </body>
      </Html>
    );
  }
}

export default KsDocument;
