import { randomUUID } from 'crypto'
import { JSDOM } from 'jsdom'
import {
    compassGroupMenuSchema,
    Day,
    Food,
    Menu,
    unicafeMenuSchema
} from '../types'
import {
    unicafeRestaurants,
    compassGroupRestaurants,
    laTorreRestaurants,
    laTorreRestaurantsInfo
} from './config'
import { isItemHighlighted, generateDateArray } from './tools'

export const getAllUnicafeMenus = async () => {
    const response = await fetch(
        `https://unicafe.fi/wp-json/swiss/v1/restaurants/?lang=fi`
    )

    const menu = await response.json()
    return unicafeMenuSchema
        .parse(menu)
        .filter((item) => unicafeRestaurants.includes(item.key))
}

export const getCompassGroupMenu = async (id: string) => {
    const response = await fetch(
        `https://www.compass-group.fi/menuapi/week-menus?costCenter=${id}&date=2023-01-09T15:13:48.273Z&language=fi`
    )

    const menu = await response.json()

    return compassGroupMenuSchema.parse({
        id,
        menu: menu
    })
}

export const getAllCompassGroupMenus = async () => {
    const promises = compassGroupRestaurants.map((id) =>
        getCompassGroupMenu(id)
    )
    return (await Promise.all(promises)).flat()
}

export const getLaTorreMenu = async (name: string) => {
    const response = await fetch(`https://www.latorre.fi/toimipiste/${name}`)
    const menu = await response.text()

    const { document } = new JSDOM(menu).window

    const menuElement = document.querySelector('#lounas')
    const timeframe = menuElement?.querySelector('.lunch-block__description')
    const itemsElements = document.querySelector('.menu-item')
    const itemsTitles = itemsElements?.querySelectorAll('.menu-item__title')
    const itemsPrices = itemsElements?.querySelectorAll('.menu-item__price')

    // TODO: fix TypeScript errors
    // @ts-ignore
    const titles = [...itemsTitles].map((item) => item.textContent.trim())
    // @ts-ignore
    const prices = [...itemsPrices].map((item) => item.textContent.trim())

    // @ts-ignore
    const [fromDay, fromMonth] = timeframe?.textContent
        ?.split('Klo')[0]
        .trim()
        .split('-')[0]
        .split('.')
    // @ts-ignore
    const [toDay, toMonth, toYear] = timeframe?.textContent
        ?.split('Klo')[0]
        .trim()
        .split('-')[1]
        .split('.')

    let from = new Date(toYear, parseInt(fromMonth) - 1, fromDay)
    const to = new Date(toYear, parseInt(toMonth) - 1, toDay)

    if (from > to) {
        from = new Date(parseInt(toYear) - 1, parseInt(fromMonth) - 1, fromDay)
    }

    const items: Food[] = titles.map((name, index) => {
        return {
            key: randomUUID(),
            name,
            price: prices[index],
            isHighlighted: isItemHighlighted(name)
        }
    })

    const days: Day[] = generateDateArray(from, to).map((date) => {
        return {
            key: randomUUID(),
            date,
            items
        }
    })

    const parsedMenu: Menu[] = [
        {
            id: randomUUID(),
            key: laTorreRestaurantsInfo[name].key,
            restaurant: laTorreRestaurantsInfo[name].name,
            address: laTorreRestaurantsInfo[name].address,
            website: laTorreRestaurantsInfo[name].website,
            menu: days
        }
    ]

    return parsedMenu
}

export const getAllLaTorreMenus = async () => {
    const promises = laTorreRestaurants.map((name) => getLaTorreMenu(name))
    return (await Promise.all(promises)).flat()
}

