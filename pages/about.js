import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'

const About = () => (
  <div className="container">
    <Head>
      <title>Create Next App | About</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">
        Go back to the <Link href="/"><a>home page</a></Link>
      </h1>
      <p>{axios.create.toString()}</p>
    </main>
  </div>
)

export default About
