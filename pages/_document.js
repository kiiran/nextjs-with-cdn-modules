import Document, { Html, Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'

const { cdnDependencies } = getConfig().serverRuntimeConfig

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          {cdnDependencies.map(({ url }) => (
            <script key={url} src={url} />
          ))}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
