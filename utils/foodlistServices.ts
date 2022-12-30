import { compassGroupMenuSchema, unicafeMenuSchema } from '../types'
import { unicafeRestaurants, compassGroupRestaurants } from './config'

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
