import Head from 'next/head'

export default ({ title, desc }: { title: string; desc?: string }) => (
  <Head>
    <title key="title">{title} &mdash; Chelsea Nicholson Photography</title>
    {desc && <meta name="description" content={desc} />}
  </Head>
)
