import Head from 'next/head'
import {
    getAllCompassGroupMenus,
    getAllUnicafeMenus
} from '@utils/foodlistServices'
import MenuCard from '@components/MenuCard'
import { Menu } from 'types'

export async function getStaticProps() {
    const menu = await getAllUnicafeMenus()
    const cc = await getAllCompassGroupMenus()

    return {
        props: {
            menu,
            cc
        }
    }
}

export default function Home({ menu, cc }: { menu: Menu[]; cc: Menu[] }) {
    return (
        <>
            <Head>
                <title>Makkarroo</title>
                <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
                <meta name="description" content="Makkarroo olla pittöös" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div>
                    <div className="navbar bg-red-600">
                        <div className="navbar-start">
                            <p className="navbar-item font-mono">makkarroo</p>
                        </div>
                    </div>

                    {/* {cc.map((item: any) => (
                        <pre>{JSON.stringify(item, null, 2)}</pre>
                    ))}
                    {menu.map((item: any) => (
                        <pre>{JSON.stringify(item, null, 2)}</pre>
                    ))} */}
                    <div className="container mx-auto grid grid-cols-3 gap-8 py-4">
                        {menu.map((item: Menu) => (
                            <MenuCard menu={item} />
                        ))}
                        {cc.map((item: Menu) => (
                            <MenuCard menu={item} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}
