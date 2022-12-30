import { z } from 'zod'
import { randomUUID } from 'crypto'
import { compassGroupRestaurantsInfo, hightlightKeywords } from '@utils/config'

export interface Menu {
    id: number
    key: string
    restaurant: string
    address: string
    website: string
    menu: Day[]
}

export interface Day {
    date: string
    items: Food[]
}

export interface Food {
    name: string
    price: string
    isHighlighted: boolean
}

const isItemHighlighted = (item: string) => {
    return hightlightKeywords.some((keyword) =>
        item.toLowerCase().includes(keyword)
    )
}

export const unicafeMenuSchema = z
    .array(
        z.object({
            id: z.number(),
            title: z.string(),
            address: z.string(),
            slug: z.string(),
            permalink: z.string(),
            menuData: z.object({
                menus: z.array(
                    z.object({
                        date: z.string(),
                        data: z.array(
                            z.object({
                                name: z.string(),
                                price: z.object({
                                    value: z.object({
                                        normal: z.string()
                                    })
                                })
                            })
                        )
                    })
                )
            })
        })
    )
    .transform((menus) => {
        return menus.map((menu) => {
            return {
                id: randomUUID(),
                key: menu.slug,
                restaurant: `Unicafe ${menu.title}`,
                address: menu.address,
                website: menu.permalink,
                menu: menu.menuData.menus.map((item) => {
                    return {
                        date: item.date, // TODO: format date to be more usable
                        items: item.data.map((item) => {
                            return {
                                name: item.name,
                                price: `${item.price.value.normal}€`,
                                isHighlighted: isItemHighlighted(item.name)
                            }
                        })
                    }
                })
            }
        })
    })

const getPriceFromString = (str: string) => {
    const priceRegex = /(\d+,\d+)\€/
    const price = priceRegex.exec(str)
    return price ? price[0] : ''
}

export const compassGroupMenuSchema = z
    .object({
        id: z.string(),
        menu: z.object({
            menus: z.array(
                z.object({
                    date: z.string(),
                    menuPackages: z.array(
                        z.object({
                            name: z.string(),
                            price: z.string(),
                            meals: z.array(
                                z.object({
                                    name: z.string()
                                })
                            )
                        })
                    )
                })
            )
        })
    })
    .transform((menu) => {
        return [
            {
                id: randomUUID(),
                key: compassGroupRestaurantsInfo[menu.id].key,
                restaurant: compassGroupRestaurantsInfo[menu.id].name,
                address: compassGroupRestaurantsInfo[menu.id].address,
                website: compassGroupRestaurantsInfo[menu.id].website,
                menu: menu.menu.menus
                    ? menu.menu.menus
                          .map((item) => {
                              return item.menuPackages.map((subitem) => {
                                  const test = {
                                      date: item.date, // TODO: format date to be more usable
                                      items: subitem.meals.map((meal) => {
                                          return {
                                              name: meal.name,
                                              price:
                                                  subitem.price === ''
                                                      ? getPriceFromString(
                                                            subitem.name
                                                        )
                                                      : subitem.price,
                                              isHighlighted: isItemHighlighted(
                                                  meal.name
                                              )
                                          }
                                      })
                                  }
                                  return test
                              })
                          })
                          .flat()
                    : []
            }
        ]
    })
