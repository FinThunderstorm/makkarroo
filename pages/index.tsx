import Head from 'next/head'
import {
    getAllCompassGroupMenus,
    getAllUnicafeMenus,
    getAllLaTorreMenus
} from '@utils/foodlistServices'
import MenuCard from '@components/MenuCard'
import { Menu } from 'types'

export async function getStaticProps() {
    const menu = await getAllUnicafeMenus()
    const cc = await getAllCompassGroupMenus()
    const fratello = await getAllLaTorreMenus()

    return {
        props: {
            menu,
            cc,
            fratello
        }
    }
}

export default function Home({
    menu,
    cc,
    fratello
}: {
    menu: Menu[]
    cc: Menu[]
    fratello: Menu[]
}) {
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

                    {/* {fratello.map((item: any) => (
                        <pre>{JSON.stringify(item, null, 2)}</pre>
                    ))}
                    {/* {cc.map((item: any) => (
                        <pre>{JSON.stringify(item, null, 2)}</pre>
                    ))}
                    {menu.map((item: any) => (
                        <pre>{JSON.stringify(item, null, 2)}</pre>
                    ))} */}
                    <div className="container mx-auto grid grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-3">
                        {menu.map((item: Menu) => (
                            <MenuCard menu={item} />
                        ))}
                        {cc.map((item: Menu) => (
                            <MenuCard menu={item} />
                        ))}
                        {fratello.map((item: Menu) => (
                            <MenuCard menu={item} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}
