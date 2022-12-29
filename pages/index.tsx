import Head from "next/head"
import { getUnicafeMenu } from "@utils/foodlistServices"

export async function getStaticProps() {
  const menu = await getUnicafeMenu()
  return {
    props: {
      menu,
    },
  }
}

export default function Home({ menu }: { menu: any }) {
  return (
    <>
      <Head>
        <title>Makkarroo</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Makkarroo olla pittöö" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <div className="navbar bg-red-600">
            <div className="navbar-start">
              <a className="navbar-item">Makkarroo</a>
            </div>
          </div>
          {menu.map((item: any) => (
            <div key={item.id} className="card">
              <pre>{JSON.stringify(item, null, 2)}</pre>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
